/**
 * Created by tusharmathur on 5/17/15.
 */
"use strict";
var _ = require('lodash');
module.exports = function (model) {
    return {

        /**
         * @param obj
         */
        create: function (req, obj) {
            return model.create(obj);
        },
        remove: function (req) {
            return model.findOneAndRemove({_id: req.params.id});
        },

        /**
         * @param obj
         */
        update: function (req, obj) {
            return model.findOne({_id: req.params.id})
                .then(function (doc) {
                    _.assign(doc, obj);
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