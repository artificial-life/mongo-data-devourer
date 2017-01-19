"use strict"

const pg = require('./post-connect.js');
const _ = require('lodash');

class PGWorker {
	constructor() {

	}
	getGroup(grp) {
		let query_string = `SELECT posts.id, posts.text, posts.timestamp, users.id, users.name, users.pic FROM posts  INNER JOIN users ON posts.user_id = users.id WHERE posts.group_id = ${grp} ORDER BY posts.timestamp DESC LIMIT 10`;
		return new Promise((resolve, reject) => {
				this._pg.query(query_string, (err, result) => {
					if (err) reject(new Error(err));
					resolve(result);
				});
			})
			.then(res => res.rows);
	}
}


module.exports = PGWorker;
