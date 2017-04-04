const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../config');

// return local strategy obj
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
  }

  //find user by username
  return User.findOne({ email: userData.email }, (err,user) => {
    if (err) {
      return done(err)
    }
    if(!user) {
      const error = new Error('Incorrect username or password')
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }

    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (err) { return done(err); }

      if (!isMatch) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError'
        return done(error);
      }
      const payload = {
        sub: user._id
      };

      // creat token string
      const token = jwt.sign(payload, config.jwtSecret);
      const data = {
        name: user.name
      }
      return done(null, token, data)
    })
  })
});
