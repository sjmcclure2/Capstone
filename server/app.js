const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const flyingSchedRouter = require('./routes/flyingschedule');
const fleetstatusRouter = require('./routes/fleetstatus');
const scheduledmxRouter = require('./routes/scheduledmx');
const aircraftstatusRouter = require('./routes/aircraftstatus')

const PROTOCOL = 'http';
const HOST = 'localhost';
const PORT = process.env.PORT || 8080;
const BASE_URL = `${PROTOCOL}://${HOST}:${PORT}`;
module.exports.PORT = PORT;

const app = express();

app.use(morgan('dev'));
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser);

app.use('/', indexRouter);
app.use('/users', usersRouter); //
app.use('/flyingschedule', flyingSchedRouter);
app.use('/fleetstatus', fleetstatusRouter);
app.use('/scheduledmx', scheduledmxRouter);
app.use('/aircraftstatus', aircraftstatusRouter);

app.listen(PORT, () => {
  console.log(`Server running at ${BASE_URL}`);
});

module.exports = app;
