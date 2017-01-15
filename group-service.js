'use strict';

const connect = require('./connect.js');
const nats = require('nats').connect();
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
		.then(v => nats.publish(replyTo, v.map(i => i.timestamp)))
		.then(response => console.log("response #" + request));
});

console.log("It's alive!");
