const express = require('express');

const { BASE_URL } = require('../index')
const aircraftStatus = require('./aircraftStatus');
const flyingSchedule = require('./flyingSchedule');
const imds = require('./imds');
const locations = require('./locations');
const notes = require('./notes');
const scheduledMx = require('./scheduledMx');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({
    aircraft_status: `${BASE_URL}/aircraft_status`,
    flying_schedule: `${BASE_URL}/flying_schedule`,
    imds: `${BASE_URL}/imds`,
    locations: `${BASE_URL}/locations`,
    notes: `${BASE_URL}/notes`,
    scheduled_mx: `${BASE_URL}/scheduled_mx`
  });
});

router.all('/', (req, res) => {
  res.sendStatus(405);
});

router.use('/aircraft_status', aircraftStatus);
router.use('/imds', imds);
router.use('/locations', locations);
router.use('/flying_schedule', flyingSchedule);
router.use('/notes', notes);
router.use('/scheduled_mx', scheduledMx);

module.exports = router;
