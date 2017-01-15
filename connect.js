'use strict';


const mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.1.49/test');
mongoose.Promise = require('bluebird');
