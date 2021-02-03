const router = require('express').Router();
const passport = require('passport');

router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
  ));


router.get('/oauth2callback', passport.authenticate(
'google',
{
    successRedirect : '/students',
    failureRedirect : '/'
}
));