const express = require('express');
const validator = require('validator');
const passport = require('passport');

const router = new express.Router();


/************
        Validation for signup form
                            *****************/
function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 6) {
    isFormValid = false;
    errors.password = 'Password must have a minimum of 6 characters';
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide a name'
  }

  if (!isFormValid) {
    message = 'Check and fix any errors before proceeding'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

/************
        Validation for login form
                            *****************/

function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !=='string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 6) {
    isFormValid = false;
    errors.password = 'Password must have a minimum of 6 characters';
  }

  if (!isFormValid) {
    message = 'Check and fix any errors before proceeding'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.get('/', (req, res) => {
  res.send('Auth router working')
})

router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
    success: false,
    message: validationResult.message,
    errors: validationResult.errors
    })
  }

  return passport.authenticate('local-signup', (err) => {
    if (err) {
      // 11000 is mongo email duplication errors
      // 409 is conflict error
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors',
          errors: {
            email: 'This email is already taken'
          }
        })
      }
      return res.status(400).json({
        success: false,
        message: 'could not process the form',
        err: err.message
      })
      console.log(err);
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up, now you should be able to log in'
    });
  })(req, res, next);
})

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
    success: false,
    message: validationResult.message,
    errors: validationResult.errors
    })
  }
  return passport.authenticate('local-login', (err, token, userData) => {
    if (err){
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }
      return res.status(400).json({
        success: false,
        message: 'could not process the form',
        err: err
      })
    }

    return res.json({
      success: true,
      message: 'you have successfully logged in!',
      token,
      user: userData
    })
  })(req, res, next)
})

module.exports = router;
