'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const gens = require('data-filler');
const Post = require('./post-schema.js');
const Promise = require('bluebird');

mongoose.connect('mongodb://localhost/test');
mongoose.Promise = require('bluebird');


let cPost = gens.post;
let post = new cPost();
let count = 1000;
post.groups(1000)
	.count(count)
	.wordsCount(10)
	.users(10);

Promise.map(_.range(1000), (i) =>
		Promise.map([...post], post_data => {
			let post = new Post(post_data);
			return post.save();
		}, {
			concurrency: 20
		}).then(x => console.log(i + '#complete ' + count)), {
			concurrency: 2
		})
	.then(x => {

		process.exit();
	});
