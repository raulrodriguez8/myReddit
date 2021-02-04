function index(req, res, next) {
    User.find({}, function(err, user)
     res.render('usrs/index', {
      user,
      user: req.user
      });
   });
  }