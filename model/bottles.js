'use strict';
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

//create instance of mongoose.schema, takes object shape of input data
var BottlesSchema = new Schema({
  step1: String,
  step2: String,
  step1ImageUrl: String,
  step2ImageUrl: String
})
//export

module.exports = mongoose.model('Bottle', BottlesSchema)
