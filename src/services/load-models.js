"use strict";
var _ = require('lodash'),
    u = require('./utils'),
    connection = require('../connections/mongo'),
    mongoose = require('mongoose-q')(),
    Schema = mongoose.Schema,
    models = require('../models'),
    Models = {};
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
        schema.path(validatorName).validate(validatorFunc, `Invalid ${validatorName}`);
    });
};

var addCreatedByToSchema = function (desc) {
    if (desc.options && desc.options.createdBy) {
        desc.schema.createdBy = {
            type: Schema.Types.ObjectId,
            ref: 'UserModel',
            required: true
        };
    }
};
var attachMethods = function (desc, schema) {
    _.assign(schema.methods, desc.methods);
};
var attachStatics = function (desc, schema) {
    _.assign(schema.statics, desc.statics);
};

function createModel(desc, name) {
    //Options required by mongoose
    addCreatedByToSchema(desc);
    var schema = new Schema(desc.schema, desc.options);

    var SCHEMA_MUTATES = [
        attachMethods,
        attachStatics,
        attachVirtual,
        attachValidators];

    u.executeAll(SCHEMA_MUTATES, desc, schema);
    Models[name] = connection.model(name, schema);
}
_.each(models, createModel);
module.exports = Models;