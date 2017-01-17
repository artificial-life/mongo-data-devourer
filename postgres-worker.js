"use strict"

const connect = require('./post-connect.js');
const _ = require('lodash');

class PGWorker {
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


module.exports = PGWorker;
