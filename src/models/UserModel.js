/**
 * Created by tusharmathur on 5/17/15.
 */
"use strict";
var _ = require('lodash');
const PERMISSIONS = [
    'advertisement.create',
    'advertisement.update',
    'advertisement.delete',
    'campaign.create',
    'campaign.update',
    'campaign.delete'
];
exports.schema = {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    permissions: {
        type: [String],
        required: true
    }
};
exports.methods = {};
exports.validators = {
    permissions: function (permissions){
        return _.diff(permissions, PERMISSIONS).length === 0;
    }
};
exports.statics = {
    permissions: PERMISSIONS
};
exports.virtuals = {
    fullName: {
        get: function () {
            return this.firstName + ' ' + this.lastName;
        }
    }
};