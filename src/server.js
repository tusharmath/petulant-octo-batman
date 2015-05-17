"use strict";
var bragi = require('bragi');
var successSymbol = bragi.util.symbols.success;
var config = require('./config');
var express = require('express');
var app = express();
var models = require('./services/load-models');
app.listen(config.port, function () {
    bragi.log('application', `${successSymbol} server listening on port ${config.port}`);
});