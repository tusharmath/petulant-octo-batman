/**
 * Created by tusharmathur on 5/23/15.
 */
"use strict";

var u = {}, _ = require('lodash');

u.executeAll = _.restParam(function (funcCollection, args) {
    return _.map(funcCollection, function (func) {
        return func.apply(null, args);
    });
});

module.exports = u;
