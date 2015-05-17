/**
 * Created by tusharmathur on 5/17/15.
 */
"use strict";
exports.schema = {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
};
exports.methods = {};
exports.statics = {};
exports.virtuals = {
    fullName: {
        get: function () {
            return this.firstName + ' ' + this.lastName;
        }
    }
};