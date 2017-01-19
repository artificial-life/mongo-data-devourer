"use strict"

const pg = require('./post-connect.js');
const _ = require('lodash');
const auth = require("auth");

class PGWorker {
	constructor() {
		this.auth = auth(this._getUser);
	}
	getGroup(grp) {
		let query_string = `SELECT posts.id, posts.text, posts.timestamp, users.id, users.name, users.pic FROM posts  INNER JOIN users ON posts.user_id = users.id WHERE posts.group_id = ${grp} ORDER BY posts.timestamp DESC LIMIT 10`;
		return new Promise((resolve, reject) => {
				this._pg.query(query_string, (err, result) => {
					if (err) reject(new Error(err));
					resolve(result);
				});
			})
			.then(res => res.rows)
			.then(v => "QQ");
	}

	_getUser(prop) {
		let query_string = `SELECT * FROM users WHERE name = ${prop.username} LIMIT 1`;
		return new Promise((resolve, reject) => {
				this._pg.query(query_string, (err, result) => {
					if (err) reject(new Error(err));
					resolve(result);
				});
			})
			.then(res => res.rows);
	}

	testUser(info) {
		return this.auth(info.user, info.pass);
	}
}


module.exports = PGWorker;