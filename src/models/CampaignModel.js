/**
 * Created by tusharmathur on 5/17/15.
 */
/*
 * Enables Publishers to register themselves on the application
 * */
"use strict";
var _ = require('lodash');
var config = require('../config');
var Schema = require('mongoose').Schema;
exports.options = {
    createdBy: true
};
exports.schema = {
    name: {
        type: Schema.Types.String,
        required: true
    },
    hosts: {
        type: [Schema.Types.String]
    },
    description: {
        type: Schema.Types.String
    }
};
exports.methods = {};
exports.validators = {};
exports.statics = {};
exports.virtuals = {};
