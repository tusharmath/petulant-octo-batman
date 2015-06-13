/**
 * Created by tusharmathur on 5/18/15.
 */
"use strict";
var Schema = require('mongoose').Schema;
exports.schema = {
    timestamp: {
        type: Schema.Types.Date,
        required: true,
        default: Date.now
    },
    advertisement: {
        type: Schema.Types.ObjectId,
        ref: 'AdvertisementModel',
        required: true
    },
    userIdentifier: {
        type: Schema.Types.String
    },
    searchPhrase: {
        type: Schema.Types.String,
        required: true
    },
    searchPhraseMatchScore: {
        type: Schema.Types.Number,
        required: true,
        min: 0,
        max: 1
    },
    orderRank: {
        type: Schema.Types.Number,
        required: true,
        min: 0
    },
    isClicked: {
        type: Schema.Types.Boolean,
        required: true,
        default: false
    }
};
