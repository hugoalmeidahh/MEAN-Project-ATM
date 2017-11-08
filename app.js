require('./server/config/config');

const express = require('express');
const cors = require('cors');
const {ObjectId} = require('mongodb');
const bodyParser = require('body-parser');

const logger = require('morgan');

const {mongoose} = require('./server/db/mongoose');

const app = express();

app.use(logger('dev'));
app.use(cors());
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('frontend/app'));

// Setup a default catch-all route that sends back a welcome message in JSON format.
require('./server/routes')(app,{});

app.get('*', (req, res, next) => {});

module.exports = app;