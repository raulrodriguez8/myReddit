// const router = require('express').Router();
// const passport = require('passport');

// router.get('/auth/google', passport.authenticate(
//   'google',
//   { scope: ['profile', 'email'] }
// ));

module.exports = {
  user: require('./user'),
  post: require('./post'),
}

