/**
 * Created by tusharmathur on 5/17/15.
 */
"use strict";
var _ = require('lodash');
module.exports = function (model) {
    return {
        create: function (req) {
            return model.create(req.query);
        },
        remove: function (req) {
            return model.findOneAndRemove({_id: req.params.id});
        },
        update: function (req) {
            return model.findOne({_id: req.params.id})
                .then(function (doc) {
                    _.assign(doc, req.query);
                    return doc.save();
                });
        },
        one: function (req) {
            return model.findOne({_id: req.params.id});
        },
        find: function (req) {
            return model.find(req.query);
        }
    };
};