'use strict';

var argv = require('minimist')(process.argv.slice(2));
let Wrk = (argv.mode == "pg") ? require('./postgres-worker.js') : require('./mongo-worker.js');
let WW = require('./worker.js');

let x = new WW(Wrk);


x.expose('request', 'getGroup', {
	'queue': 'job.workers'
});

x.expose('login', 'testUser', {
	'queue': 'job.workers'
});