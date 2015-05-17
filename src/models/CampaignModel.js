/**
 * Created by tusharmathur on 5/17/15.
 */

"use strict";
var _ = require('lodash');
var config = require('../config');
var Schema = require('mongoose').Schema;
exports.options = {
    createdBy: true
};
exports.schema = {
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
};
exports.methods = {};
exports.validators = {};
exports.statics = {};
exports.virtuals = {};
