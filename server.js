"use strict";

const nats = require('nats').connect();


const PORT = 8888;
const express = require('express')
const app = express()

app.get('/', function (req, res) {
	nats.request('request', function (response) {
		res.send('Result:' + JSON.stringify(response));
	});
})

app.get('/group/:group_id', function (req, res) {
	nats.request('request', req.params.group_id,
		function (response) {
			res.send('Result:' + JSON.stringify(response));
		});
})

app.listen(PORT, function () {
	console.log(`Example app listening on port ${PORT}!`);
})
