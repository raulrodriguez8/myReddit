const router = require('express').Router();
const passport = require('passport');

router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
  ));


router.get('/oauth2callback', passport.authenticate(
'google',
{
    successRedirect : '/users',
    failureRedirect : '/'
}
));

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/', function(req, res) {
    res.render('index', {
        user: req.user
    });
  });

  module.exports = router;