// Generated by CoffeeScript 1.9.2
var config, errorHandler, livereload, logger;

errorHandler = require('errorhandler');

livereload = require('express-livereload');

config = require('./../config/index');

logger = require('bragi');

module.exports = function(app) {
  livereload(app, {
    watchDir: config.root + "/frontend"
  });
  return app.use(errorHandler()).use('/api', function(req, res, next) {
    logger.log('http:api', logger.util.print(req.method, 'green'), req.url);
    return next();
  }).use('/static', function(req, res, next) {
    logger.log('http:caching', logger.util.print(req.method, 'green'), req.url);
    return next();
  }).use(function(req, res, next) {
    logger.log('http:no-caching', req.url);
    res.header('Cache-Control', "no-cache, max-age=0");
    return next();
  });
};
