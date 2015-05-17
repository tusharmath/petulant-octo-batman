"use strict";
var _ = require('lodash');
var connection = require('../connections/mongo');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require('../models');
var Models = {};
var attachVirtual = function (desc, schema) {
    _.each(desc.virtuals, function (virtualProperty, virtualName) {
        if (virtualProperty.get) {
            schema.virtual(virtualName).get(virtualProperty.get);
        }
        if (virtualProperty.set) {
            schema.virtual(virtualName).set(virtualProperty.set);
        }
    });
};

var attachValidators = function (desc, schema) {
    _.each(desc.validators, function (validatorFunc, validatorName) {
        schema.path(validatorName).validate(validatorFunc);
    });
};

function createModel(desc, name) {
    var schema = new Schema(desc.schema, desc.options);
    _.assign(schema.methods, desc.methods);
    _.assign(schema.statics, desc.statics);
    attachVirtual(desc, schema);
    attachValidators(desc, schema);
    Models[name] = connection.model(name, schema);
}
_.each(models, createModel);
module.exports = Models;