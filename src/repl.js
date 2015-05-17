/**
 * Created by tusharmathur on 5/17/15.
 */
"use strict";
var _ = require('lodash');
var bragi = require('bragi');
bragi.options.groupsEnabled = ['repl'];
var config = require('./config');
var repl = require('repl');
var models = require('./services/load-models');
var index = 0;
//Setup globals
global.lo = _;
global.$$ = function (err, res) {
    if (err) {
        return bragi.log('error', err);
    }
    var varName = 'res' + index++;
    global[varName] = res;
    var message = bragi.util.print(varName, 'green');
    bragi.log('repl', `\nOutput:\n${message}:= ${res}`);
};
_.assign(global, models);

repl.start({
    prompt: `${config.appName.toUpperCase()}: `,
    input: process.stdin,
    output: process.stdout,
    useColors: true,
    useGlobal: true
});