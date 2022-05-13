const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV])

/* flying schedule request page */

// SELECT tail_number, scheduled_launch, scheduled_land, sortie_number, callsign, req_fuel
// FROM sorties
// WHERE (sortie projected launch is withing 7 days)

// SELECT status
// FROM aircraft
// WHERE tail_number

const now = Date.now();

router.get('/', (req, res) => {
  const filterTime = 1000 * 60 * 60 * 24 * (req.query.days ?? 7);
  knex('sorties')
  .whereBetween('projected_launch', [ new Date(now - filterTime), new Date(now + filterTime) ])
  .join('aircraft', 'aircraft.tail_number', 'sorties.tail_number')
  .select('*', 'aircraft.id as aircraft_id', 'sorties.id')
  .orderBy(req.query.sort ?? 'projected_launch', req.query.dir)
  .offset(req.query.offset)
  .limit(req.query.limit)
  .then(data => {res.json(data)})
  .catch(err => {
    console.error(err);
    res.sendStatus(400);
  });
});

router.post('/', (req, res) => {
  knex('sorties')
  .insert(req.body, ['*'])
  .then(data => res.status(201).json(data))
  .catch(err => {
    console.error(err);
    res.sendStatus(400);
  });
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
});

router.all('/', (req, res) => {
  res.sendStatus(405);
});

module.exports = router;
