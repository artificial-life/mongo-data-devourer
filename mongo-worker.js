"use strict"

const connect = require('./connect.js');
const _ = require('lodash');
const Post = require('./post-schema.js');
const User = require('./user-schema.js');
const auth = require("./auth.js");

class mongoWorker {
	constructor() {
		this.auth = auth(this._getUser);
	}
	getGroup(data) {
		return Post.find({
				group_id: data
			})
			.limit(10)
			.lean()
			.sort('-timestamp')
			.then(v => "QQ");
	}

	_getUser(prop) {
		return User.find({
				name: prop.username
			})
			.limit(1)
			.lean();
	}

	testUser(info) {
		return this.auth(info.user, info.pass);
	}
}


module.exports = mongoWorker;
