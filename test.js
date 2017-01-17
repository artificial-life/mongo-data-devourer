'use strict';

let WW = require('./worker.js');
let MW = require('./mongo-worker.js');

let x = new WW(MW);


x.expose('request', 'getGroup', {
  'queue': 'job.workers'
});
