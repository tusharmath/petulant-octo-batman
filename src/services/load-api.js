/**
 * Created by tusharmathur on 5/17/15.
 */
"use strict";
var _ = require('lodash');
var bragi = require('bragi');
var express = require('express');
var controllers = require('../controllers');
var createDefaultActions = require('./default-actions');
var config = require('../config');
var models = require('./load-models');

var getModel = function (collectionName) {
    return models[collectionName + 'Model'];
};

var getCollectionName = function (ctrlName) {
    return ctrlName.replace('Controller', '');
};

/**
 * @param {String("body")|String("query")} bodySource
 */
var getRequestBody = function (bodySource, req) {
    bodySource = bodySource || 'body';
    return req[bodySource];
};
var defaultHandler = function (bodySource, action, req, res) {
    action(req, getRequestBody(bodySource, req)).then(function (val) {
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
    var GET = 'get', POST = 'post', DELETE = 'delete', PATCH = 'patch';
    var routes = {
        'create': [{url: `/${ctrlName}`, method: POST}],
        'update': [{url: `/${ctrlName}/:id`, method: PATCH}],
        'remove': [{url: `/${ctrlName}/:id`, method: DELETE}],
        'find': [{url: `/${ctrlName}s`, method: GET}],
        'one': [{url: `/${ctrlName}/:id`, method: GET}]
    };
    //Helpful urls for dev env
    if (config.env === 'development') {
        routes.create.push({url: `/${ctrlName}/create`, method: GET, bodySource: 'query'});
        routes.update.push({url: `/${ctrlName}/update/:id`, method: GET, bodySource: 'query'});
        routes.remove.push({url: `/${ctrlName}/remove/:id`, method: GET, bodySource: 'query'});
    }
    return routes[actionName];
};
var router = new express.Router();
_.each(controllers, function (ctrl, ctrlName) {
    var collectionName = getCollectionName(ctrlName);
    var model = getModel(collectionName);
    var actions = createDefaultActions(model);

    _.assign(actions, ctrl.actions);

    _.each(actions, function (action, actionName) {
        var routes = getRoute(collectionName, actionName);
        _.each(routes, function (route) {
            router[route.method](route.url, _.partial(defaultHandler, route.bodySource, action));
        });
    });
});
module.exports = router;