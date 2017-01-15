'use strict';

var argv = require('minimist')(process.argv.slice(2));

const _ = require('lodash');
const gens = require('data-filler');
const Post = require('./post-schema.js');
const Promise = require('bluebird');

const connect = require('./connect.js');

let count = argv.count || 1000;
let groups = argv.groups || 1000;
let wordsCount = argv.words || 10;
let users = argv.users || 10;
let iterations = argv.iterations || 1000;

let cPost = gens.post;
let post = new cPost();

post.groups(groups)
	.count(count)
	.wordsCount(wordsCount)
	.users(users);

let MakePosts = (i) => Promise.map([...post], post_data => {
	let post = new Post(post_data);
	return post.save();
}, {
	concurrency: 20
}).then(x => console.log(i + '#complete ' + count));


Promise.map(_.range(iterations), MakePosts, {
		concurrency: 2
	})
	.then(x => process.exit());
