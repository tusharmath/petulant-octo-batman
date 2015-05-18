"use strict";
var _ = require('lodash');
var bragi = require('bragi');
var successSymbol = bragi.util.symbols.success;
var config = require('./config');
var express = require('express');
var app = express();
var models = require('./services/load-models');
var bodyParser = require('body-parser')

var apiV1 = require('./services/load-api');


app.use(bodyParser.json());
app.use('/api/v1', apiV1);

app.listen(config.port, function () {
    bragi.log('application', `${successSymbol} server listening on port ${config.port}`);
});