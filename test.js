'use strict';

let WW = require('./worker.js');

class None {
	constructor() {

	}
};

let x = new WW(None);


WW.expose('request', 'getGroups');
