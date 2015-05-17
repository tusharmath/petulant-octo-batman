/**
 * Created by tusharmathur on 5/17/15.
 */
"use strict";
var config = require('../config');
var bragi = require('bragi');
var successSymbol = bragi.util.symbols.success;
var mongoose = require('mongoose');
var connection = mongoose.createConnection(config.mongo.uri);
connection.on('error', function () {
    bragi.error('application', `could not connect to database`);
});
connection.on('connected', function (){
    bragi.log('application', `${successSymbol} database connected`);
});

module.exports = connection;