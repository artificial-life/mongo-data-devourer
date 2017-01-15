'use strict';


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
mongoose.Promise = require('bluebird');
