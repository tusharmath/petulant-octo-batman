"use strict";
var _ = require('lodash'),
    bragi = require('bragi'),
    successSymbol = bragi.util.symbols.success,
    config = require('./config'),
    express = require('express'),
    app = express(),
    models = require('./services/load-models'),
    bodyParser = require('body-parser');

var apiV1 = require('./services/load-api');

app.use(bodyParser.json());
app.use('/api/v1', apiV1);

app.listen(config.port, function () {
    bragi.log('application', `${successSymbol} server listening on port ${config.port}:${config.env}`);
});