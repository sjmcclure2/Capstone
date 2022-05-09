const express = require('express');

const { BASE_URL } = require('../index')
const flyingSchedule = require('./flyingSchedule');
const fleetStatus = require('./fleetStatus');
const scheduledMx = require('./scheduledMx');
const aircraftStatus = require('./aircraftStatus')

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({
    aircraft_status: `${BASE_URL}/aircraft_status`,
    fleet_status: `${BASE_URL}/fleet_status`,
    flying_schedule: `${BASE_URL}/flying_schedule`,
    scheduled_mx: `${BASE_URL}/scheduled_mx`
  });
});

router.all('/', (req, res) => {
  res.sendStatus(405);
});

router.use('/flying_schedule', flyingSchedule);
router.use('/fleet_status', fleetStatus);
router.use('/scheduled_mx', scheduledMx);
router.use('/aircraft_status', aircraftStatus);

module.exports = router;
