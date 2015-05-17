/**
 * Created by tusharmathur on 5/17/15.
 */
"use strict";
var _ = require('lodash');
var bragi = require('bragi');
var express = require('express');
var controllers = require('../controllers');
var createDefaultActions = require('./default-actions');
var models = require('./load-models');

var getModel = function (collectionName) {
    return models[collectionName + 'Model'];
};

var getCollectionName = function (ctrlName) {
    return ctrlName.replace('Controller', '');
};

var defaultHandler = function (action, req, res) {
    action(req).then(function (val) {
        res.send(val);
    }, function (err) {
        var unknownErr;
        bragi.log('error', err);
        if (err.name === 'ValidationError') {
            return res.status(400).send(err);
        }
        res.status(500).send(err);
    })
};

var getRoute = function (ctrlName, actionName) {
    ctrlName = ctrlName.toLowerCase();
    var GET = 'get';
    return {
        'create': {url: `/create/${ctrlName}`, method: GET},
        'update': {url: `/update/${ctrlName}/:id`, method: GET},
        'find': {url: `/${ctrlName}s`, method: GET},
        'remove': {url: `/remove/${ctrlName}/:id`, method: GET},
        'one': {url: `/${ctrlName}/:id`, method: GET}
    }[actionName];
};
var router = new express.Router();
_.each(controllers, function (ctrl, ctrlName) {
    var collectionName = getCollectionName(ctrlName);
    var model = getModel(collectionName);
    var actions = createDefaultActions(model);

    _.assign(actions, ctrl.actions);

    _.each(actions, function (action, actionName) {
        var route = getRoute(collectionName, actionName);
        router[route.method](route.url, _.partial(defaultHandler, action));
    });
});
module.exports = router;