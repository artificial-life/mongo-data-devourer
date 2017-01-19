"use strict";

const cluster = require('cluster');
var argv = require('minimist')(process.argv.slice(2));
var is_cluster_mode = argv.mode != "single";

// Code to run if we're in the master process
if (is_cluster_mode && cluster.isMaster) {
	const cpuCount = require('os')
		.cpus()
		.length;

	for (var i = 0; i < cpuCount; i += 1) {
		cluster.fork();
	}
} else {

	const nats_url = "nats://" + (argv.nats || "127.0.0.1:4222");

	const nats = require('nats')
		.connect({
			'url': nats_url
		});

	const PERF_INTERVAL = 15000;
	const PORT = argv.port || 8888;
	const express = require('express');
	const performance = require("performance-nodejs");
	const monitor = require("event-loop-monitor");

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

	app.post('/login', function (req, res) {
		console.log(req.params);
		nats.request('login', req.params,
			function (response) {
				res.send('Result:' + JSON.stringify(response));
			});
	})

	app.listen(PORT, function () {
		console.log(`Server listening on port ${PORT}!`);
	});

	const timer = performance(
		data => console.info("Lag: ", data.lag),
		'MB',
		PERF_INTERVAL
	);

	timer.ref();
	monitor.on("data", latency => console.info("Latency: ", latency));
	monitor.resume();

	process.on("exit", () => monitor.stop());
}