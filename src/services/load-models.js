"use strict";
var _ = require('lodash'),
    u = require('./utils'),
    connection = require('../connections/mongo'),
    mongoose = require('mongoose-q')(),
    Schema = mongoose.Schema,
    models = require('../models'),
    Models = {};

var propertyAttacher = _.curry(function (propertyType, attacher, desc, schema) {
    _.each(desc[propertyType], _.partial(attacher, schema));
});

var virtualPropertyAttacher = function (schema, virtualProperty, virtualName) {
    _.each(['get', 'set'], function (property) {
        var virtualProperty = virtualProperty[property];
        if (virtualProperty) {
            schema.virtual(virtualName)[property](virtualProperty);
        }
    });
};

var validatorAttacher = function (schema, validatorFunc, validatorName) {
    schema.path(validatorName).validate(validatorFunc, `Invalid ${validatorName}`);
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
        propertyAttacher('virtual', virtualPropertyAttacher),
        propertyAttacher('validator', validatorAttacher)
    ];
    _.invoke(SCHEMA_MUTATES, _.call, null, desc, schema);
    Models[name] = connection.model(name, schema);
}
_.each(models, createModel);
module.exports = Models;