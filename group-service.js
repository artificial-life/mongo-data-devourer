'use strict';

var argv = require('minimist')(process.argv.slice(2));

const nats_url = "nats://" + (argv.nats || "127.0.0.1:4222");

const connect = require('./connect.js');
const _ = require('lodash');
const nats = require('nats').connect({
	'url': nats_url
});

const Post = require('./post-schema.js');

const id = Math.random();

// Request Streams
nats.subscribe('request', {
	'queue': 'job.workers'
}, function (request, replyTo) {
	Post.find({
			group_id: request
		})
		.limit(10)
		.lean()
		.sort('-timestamp')
		.then(v => {
			nats.publish(replyTo, _.map(v, 'timestamp').join(','));
		})
		.then(response => console.log("response #" + request));
});

console.log("It's alive!");
