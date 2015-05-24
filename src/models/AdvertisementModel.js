/**
 * Created by tusharmathur on 5/17/15.
 * Enables advertisers to market their product
 */


"use strict";
var _ = require('lodash');
var config = require('../config');
var Schema = require('mongoose').Schema;
exports.options = {
    createdBy: true
};
exports.schema = {
    domain: {
        type: Schema.Types.ObjectId,
        ref: 'DomainModel',
        required: true
    },
    dispatchData: {
        type: Schema.Types.Mixed
    },
    cpcBid: {
        type: Number,
        required: true
    },
    keywords: {
        //Selected from the list of keywords available in the Domain
        type: [String],
        required: true
    }
};
exports.methods = {};
exports.validators = {
    dispatchData: function (val) {
        return JSON.stringify(val).length < config.maxDispatchDataSize;
    }
};
exports.statics = {};
exports.virtuals = {};
