const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const BASE_URL = {
  development: `http://localhost:${PORT}/api`,
  production: `https://${process.env.HOST}/api`
}[process.env.NODE_ENV];
module.exports.BASE_URL = BASE_URL;

const api = require('./routes/api');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.redirect('/api');
});

app.all('/', (req, res) => {
  res.sendStatus(405);
});

app.use('/api', api);

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server running at ${BASE_URL}`);
});
