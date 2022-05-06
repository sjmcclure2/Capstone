var express = require('express');
var router = express.Router();

/* fleet status */
//FROM aircraft SELECT *

//FROM sorties SELECT tail_number, scheduled_launch,
//scheduled_land, sortie_number
//FROM locations SELECT location where aircraft.location

router.get('/', (req, res, next) => {
  res.send(200);
});

module.exports = router;