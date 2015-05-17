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
        return bragi.error(err);
    }
    var varName = 'res' + index++;
    global[varName] = res;
    bragi.log('repl', `${bragi.util.print(varName, 'green')}:\n ${res}`);
};
_.assign(global, models);

repl.start({
    prompt: `${config.appName}: `,
    input: process.stdin,
    output: process.stdout,
    useColors: true,
    useGlobal: true
});