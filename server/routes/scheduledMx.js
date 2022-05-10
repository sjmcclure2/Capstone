var express = require('express');
var router = express.Router();

/* scheduled mx  */

//---------------------------------------------------------This is a stretch request ----------------------------------------------------------//

//FROM aircraft SELECT *
//FROM imds SELECT * WHERE is_complete === false

//FROM sorties SELECT tail_number, scheduled_launch,
//scheduled_land, sortie_number, callsign, req_fuel WHERE (sortie projected launch is withing 7 days)

router.get('/', (req, res, next) => {
  res.sendStatus(200);
});


router.all('/', (req, res) => {
  res.sendStatus(405);
});

module.exports = router;