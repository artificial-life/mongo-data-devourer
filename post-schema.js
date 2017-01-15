"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	id: String,
	text: String,
	timestamp: {
		type: Number,
		index: true
	},
	user_id: Number,
	group_id: {
		type: Number,
		index: true
	}
});


module.exports = mongoose.model('Post', postSchema);
