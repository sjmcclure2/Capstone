const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV]);

router.get('/', (req, res) => {
  knex('imds')
  .orderBy(req.query.sort ?? 'jcn', req.query.dir)
  .offset(req.query.offset)
  .limit(req.query.limit ?? 100)
  .then(data => {res.json(data)})
  .catch(err => {
    console.error(err);
    res.sendStatus(400);
  });
});

router.get('/:id', (req, res) => {
  knex('imds')
  .where('jcn', req.params.id)
  .then(data => {res.json(data)})
  .catch(err => {
    console.error(err);
    res.sendStatus(400);
  });
});

router.post('/', (req, res) => {
  knex('imds')
  .insert(req.body, ['*'])
  .then(data => res.status(201).json(data))
  .catch(err => {
    console.error(err);
    res.sendStatus(400);
  });
});

router.patch('/:id', (req, res) => {
  knex('imds')
  .where('jcn', req.params.id)
  .update(req.body, ['*'])
  .then(data => res.status(200).json(data))
  .catch(err => {
    console.error(err);
    res.sendStatus(400);
  });
});

router.delete('/:id', (req, res) => {
  knex('imds')
  .where('jcn', req.params.id)
  .del()
  .then(data => res.status(200)
    .send(`JCN ${req.params.id} deleted.`))
  .catch(err => {
    console.error(err);
    res.sendStatus(400);
  });
});

router.all('/', (req, res) => {
  res.sendStatus(405);
});

module.exports = router;
