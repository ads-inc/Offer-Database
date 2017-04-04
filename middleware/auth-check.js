const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../config');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    console.log(req.headers.authorization, 'auth-check')
    console.log(req.type)
    return res.status(401).end();
  }
  //get last part of token separated by space
  const token = req.headers.authorization.split(' ')[1];
  console.log(token);
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      // console.log(err);
      return res.status(401).end()
    }

    const userId = decoded.sub;
    console.log(userId);
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }

      return next();
    })
  })
}
