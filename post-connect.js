"use strict"

const PG = require('pg');

const argv = require('minimist')(process.argv.slice(2));

const pg = new PG.Client({
	user: 'postgres',
	database: 'postgres',
	password: '2',
	host: argv.pg,
	port: argv.port || 5432,
	max: 10,
	idleTimeoutMillis: 30000
});

pg.connect((err) => {

});


module.exports = pg;
