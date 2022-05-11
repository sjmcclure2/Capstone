var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV])

/* fleet status */
// SELECT *
// FROM aircraft 

// SELECT scheduled_launch,
// scheduled_land, sortie_number
// FROM sorties 

// SELECT location WHERE aircraft.location
// FROM locations 

router.get('/', async (req, res) => {
  knex('aircraft')
  .join('locations', 'aircraft.location', 'locations.id')
  .select('aircraft.*', 'locations.name as location_name')
  .orderBy(req.query.sort ?? 'tail_number', req.query.dir)
  .offset(req.query.offset)
  .limit(req.query.limit)
  .then(async data => {  //next sortie #, last sortie # 
    const airplanes = await data.map(async plane => { 
      
      
      const sortieList = await knex('sorties')
      .pluck('id')
      .where('sorties.tail_number', plane.tail_number)
      .catch(err => {
        console.error(err);
        res.sendStatus(400);
      });
      plane.sorties =  sortieList;
      
      
      const lastSortie = await knex('sorties')
      .first('id', 'actual_land')
      .where('sorties.tail_number', plane.tail_number)
      .whereNotNull('actual_land')
      .orderBy('actual_land', 'desc')
      .catch(err => {
        console.error(err);
        res.sendStatus(400);
        });
        plane.last_sortie =  lastSortie ?? null;
        
        
        const nextSortie = await knex('sorties')
        .first('id', 'projected_launch')
        .where('sorties.tail_number', plane.tail_number)
        .whereNull('actual_land')
        .orderBy('projected_launch')
        .catch(err => {
          console.error(err);
          res.sendStatus(400);
        });
        plane.next_sortie =  nextSortie ?? null;
        
        const jobs = await knex('imds')
        .where('imds.tail_number', plane.tail_number)
        .where('imds.is_complete', false)
        .then(data => data.map(async job => {
          const notes = await knex('notes').where('jcn', job.jcn)
          job.notes = notes;
          if(job.symbol === 'X'){ job.priority = 1;}
          else if(job.symbol === '/') { job.priority = 2; }
          else { job.priority = 3 };
          return job;
        }) 
        )
        .then((data) => {
          return Promise.all(data).then(data => data)
        })
        .catch(err => console.error(err));
        plane.driver = jobs.sort((a, b) => a.priority - b.priority)[0] ?? null;
        
        return plane;
      })
      return airplanes;
    })
    .then(data => {
      Promise.all(data).then(data => res.json(data));
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(400);
    })
  });
  
  //GET request for Tail_number: returns 
  
  // router.get('/:tn', (req, res) => {
  //   knex('aircraft')
  //   .where('tail_number', req.params.tn)
  //   .then(data => res.status(200).json(data))
  //   .catch(err => {
  //     console.error(err);
  //     res.sendStatus(400);
  //   });
  // })
  
  // PATCH request from updateStatus modal for aircraft: status, fuel_quan, location

  router.patch('/:id', (req, res) => {
    console.log(req.body)
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