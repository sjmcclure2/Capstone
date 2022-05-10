var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV])

/* fleet status */
//SELECT *
//FROM aircraft 

//SELECT scheduled_launch,
//scheduled_land, sortie_number
//FROM sorties 

//SELECT location where aircraft.location
//FROM locations 

router.get('/', async (req, res) => {
  knex('aircraft')
  .join('locations', 'aircraft.location', 'locations.id')
  .select('*', 'aircraft.id')
  .then(async data => {  //next sortie #, last sortie # 
    const airplanes = await data.map(async plane => { 

      
      const sortieList = await knex('sorties')
        .pluck('id')
        .where('sorties.tail_number', plane.tail_number)
        .catch(err => {
          console.error(err)
        })
      plane.sorties =  sortieList;

      
      const lastSortie = await knex('sorties')
        .first('id', 'actual_land')
        .where('sorties.tail_number', plane.tail_number)
        .whereNotNull('actual_land')
        .orderBy('actual_land', 'desc')
        .catch(err => {
          console.error(err)
        })
      plane.lastSortie =  lastSortie ?? null;


      const nextSortie = await knex('sorties')
        .first('id', 'projected_launch')
        .where('sorties.tail_number', plane.tail_number)
        .whereNull('actual_land')
        .orderBy('projected_launch')
        .catch(err => {
          console.error(err)
        })
      plane.nextSortie =  nextSortie ?? null;

      const jobs = await knex('imds')
      .where('imds.tail_number', plane.tail_number)
      .where('imds.is_complete', false)
      .then(data => data.map(async job => {
        const notes = await knex('notes').where('jcn', job.jcn)
        job.notes = notes;
        if(job.symbol === 'X'){ job.priority = 1;}
        else if(job.symbol === '/') { job.priority = 2; }
        else { job.priority = 3 }
        return job
        }) 
      )
      .then((data) => {
        return Promise.all(data).then(data => data)
      })
      .catch(err => console.error(err));
      plane.driver = jobs.sort((a, b) => a.priority - b.priority)[0] ?? null;

      return plane;
    })
    return airplanes
  })
  .then(data => {
    Promise.all(data).then(data => res.json(data))
  })
  .catch(err => {
    console.error(err)
  })
});

router.patch('/:id', (req, res) => {
  knex('sorties')
  .where('id', req.params.id)
  .update(req.body, ['*'])
  .then(data => res.status(200).json(data))
  .catch(err => {
    console.error(err);
    res.sendStatus(400);
  });
  knex('aircraft')
  .where('id', req.params.id)
  .update(req.body, ['*'])
  .then(data => res.status(200).json(data))
  .catch(err => {
    console.error(err);
    res.sendStatus(400);
  });
});

router.all('/', (req, res) => {
  res.sendStatus(405);
});

module.exports = router;