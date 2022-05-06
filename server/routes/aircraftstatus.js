var express = require('express');
var router = express.Router();
const knex = require('knex')(require('./../knexfile.js')[process.env.NODE_ENV])
/* aircraft status page */


//FROM aircraft SELECT *
router.get('/', (req, res, next) => {
  knex('aircraft')
    .then(data => res.json(data))
    .catch(err => console.error(err))
});

module.exports = router;