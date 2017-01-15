'use strict';

var argv = require('minimist')(process.argv.slice(2));

const mongo_url = "mongodb://" + (argv.mongo || "localhost");
const mongo_db = (argv.db || "test");

const mongoose = require('mongoose');
mongoose.connect(mongo_url + '/' + mongo_db);
mongoose.Promise = require('bluebird');
