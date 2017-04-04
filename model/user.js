'use strict';
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

//create instance of mongoose.schema, takes object shape of input data
var UserSchema = new Schema({
  email: String,
  password: String,
  name: String
})

//compare password with decrpted passwrord in database

UserSchema.methods.comparePassword = function comparePassword(password, cb){
  bcrypt.compare(password, this.password, cb);
}

//pre save hook

UserSchema.pre('save', function saveHook(next) {
  const user = this;

  if (!user.isModified('password')){
    return next();
  }

  return bcrypt.genSalt((saltError, salt) => {
    if( saltError) {
      return next(saltError);
    }
    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if(hashError) {
        return next(hashError)
      }
      user.password = hash;
      return next();
    })
  })
})

//export

module.exports = mongoose.model('User', UserSchema)
