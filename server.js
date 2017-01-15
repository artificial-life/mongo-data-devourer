"use strict";

var argv = require('minimist')(process.argv.slice(2));

const nats_url = "nats://" + (argv.nats || "127.0.0.1:4222");

const nats = require('nats').connect({
	'url': nats_url
});

const PORT = 8888;
const express = require('express')
const app = express()

app.get('/', function (req, res) {
	nats.request('request', function (response) {
		res.send('Result:' + JSON.stringify(response));
	});
})

app.get('/group/:group_id', function (req, res) {
	console.log(req.params);
	nats.request('request', req.params.group_id,
		function (response) {
			res.send('Result:' + JSON.stringify(response));
		});
})

app.listen(PORT, function () {
	console.log(`Server listening on port ${PORT}!`);
});
