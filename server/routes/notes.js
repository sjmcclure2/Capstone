const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV])

//tail_number to notes

router.get('/', (req, res) => {
  knex('aircraft')
  .where('tail_number', req.query.tail_number)
    .then(async data => {
      return await data.map(async plane => {
        const jobs = await knex('imds')
        .where('imds.tail_number', plane.tail_number)
        .where('imds.is_complete', false)
        .then(data => data.map(async job => {
          const notes = await knex('notes').where('jcn', job.jcn)
          job.notes = notes;
          if(job.symbol === 'X'){ job.priority = 1;}
          else if(job.symbol === '/') { job.priority = 2; }
          else { job.priority = 3 }
          return job
          }) 
        )
        .then((data) => {
          return Promise.all(data).then(data => data)
        })
        .catch(err => console.error(err));
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

router.post('/', (req, res) => {
  knex('notes')
  .insert(req.body, ['*'])
  .then(data => res.status(201).json(data))
  .catch(err => {
    console.error(err);
    res.sendStatus(400);
  });
})

router.all('/', (req, res) => {
  res.sendStatus(405);
});

module.exports = router;
