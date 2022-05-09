var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV])

/* flying schedule request page */

// SELECT tail_number, scheduled_launch, scheduled_land, sortie_number, callsign, req_fuel
// FROM sorties
// WHERE (sortie projected launch is withing 7 days)

// SELECT status
// FROM aircraft
// WHERE tail_number

const filterTime = 1000 * 60 * 60 * 24 * 7; // 7 days
const now = Date.now();

router.get('/', (req, res) => {
  knex('sorties')
  .whereBetween('projected_launch', [ new Date(now - filterTime), new Date(now + filterTime) ])
  .join('aircraft', 'sorties.tail_number', 'aircraft.tail_number')
  .then(data => res.json(data));
});

module.exports = router;
