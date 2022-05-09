var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV]);

// SELECT * FROM aircraft;
router.get('/', (req, res) => {
  knex('aircraft')
    // .limit(1)
    .then(async data => {
      return await data.map(async plane => {

        const jobs = await knex('imds')
        .where('imds.tail_number', plane.tail_number)
        .where('imds.is_complete', false)
        .then(async data => {
          return await data.map((job) => {
            if(job.symbol === 'X'){
              job.priority = 1;
            } else if(job.symbol === '/') {
              job.priority = 2;
            } else {
              job.priority = 3
            }
            return job;
          })
        })
        .catch(err => console.error(err))
        plane.imds = jobs.sort(function(a, b) {return a.priority - b.priority});
        plane.driver = jobs[0]
        return plane
      })
    })
    .then(data => {
      Promise.all(data).then(data => res.json(data))
    })
    .catch(err => console.error(err));
});

module.exports = router;