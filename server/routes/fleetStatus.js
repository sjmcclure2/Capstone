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

router.all('/', (req, res) => {
  res.sendStatus(405);
});

module.exports = router;