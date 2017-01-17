"use strict"

const connect = require('./connect.js');
const _ = require('lodash');
const Post = require('./post-schema.js');

class mongoWorker {
  constructor() {

  }
  getGroup(data) {
    return Post.find({
        group_id: data
      })
      .limit(10)
      .lean()
      .sort('-timestamp')
      .then(v => "QQ");
    // _.map(v, 'timestamp').join(',')
  }
}


module.exports = mongoWorker;
