const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

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
    name: req.body.name.trim()
  };

  const newUser = new User(userData);
  newUser.save((err) => {
    if (err) {
      console.log('local-signup err: ', err)
      return done(err);
    }
    return done(null);
  })
})
