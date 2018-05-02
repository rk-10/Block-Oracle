var mongoose = require('mongoose');

var model1 = new mongoose.Schema({
    ID: String,
    address: String,
    data: String,
    datasource: String,
    proof: String,
    date: { type: Date, default: Date.now }
});

exports.module = mongoose.model('Model1', model1);