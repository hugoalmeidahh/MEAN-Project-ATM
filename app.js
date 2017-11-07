require('./server/config/config');

const express = require('express');
const {ObjectId} = require('mongodb');
const bodyParser = require('body-parser');

const logger = require('morgan');

const {mongoose} = require('./server/db/mongoose');
const {Todo} = require('./server/models/todo');


const app = express();

app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes')(app,{});
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'beginning API.',
}));

module.exports = app;