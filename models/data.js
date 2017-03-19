var mongoose = require('mongoose');

var Schema = new mongoose.Schema({}, {strict: false});

mongoose.model('Data', Schema);