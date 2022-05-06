var express = require('express');
var router = express.Router();

/* flying schedule request page */

//FROM sorties SELECT tail_number, scheduled_launch,
//scheduled_land, sortie_number, callsign, req_fuel WHERE (sortie projected launch is withing 7 days)

//FROM aircraft SELECT status WHERE tail_number
router.get('/', (req, res, next) => {
  res.send(200);
});

module.exports = router;
