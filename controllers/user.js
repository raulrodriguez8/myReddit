const bcrypt = require('bcryptjs');

const db = require('../models');

// presentational
const register = (req, res) => {
  res.render('user/register');
}

const createUser = (req, res) => {
  console.log('before hash', req.body )
  //look for user by e-mail address
  db.User.findOne( { email: req.body.email }, ( err, foundUser ) => {
    //error logic if user exists
    if ( err ) return console.log(err);
    
    if ( foundUser ) return console.log('user exists');
    //password authentication
    bcrypt.genSalt( 10, ( err, salt ) => {
      if ( err ) return console.log(err);
      //hash the password passed by the user
      bcrypt.hash( req.body.password, salt, ( err, hash ) => {
        if ( err ) return console.log(err);
        //assign password passed in to variable hash
        req.body.password = hash
        console.log('after hash', req.body )
        //if no error, create user using the data pulled in from the form
        db.User.create( req.body, ( err, createdUser ) => {
          if ( err ) return console.log(err);

          console.log(createUser);
          res.redirect('/users/signin');
        })
      });
    })
  })
}

// presentational
const loginForm = ( req, res ) => {
  res.render('user/login')
};

const login = ( req, res ) => {
  if ( req.body.email === '' || 
  req.body.password === '' ) return res.render('user/login');
  
  db.User.findOne( { email: req.body.email }, ( err, foundUser ) => {
    if ( err ) return res.render('user/login')

    if ( !foundUser ) return res.render('user/login')

    bcrypt.compare( req.body.password, foundUser.password, ( err, isMatch ) => {
      if ( err ) return res.render('user/login')

      if ( !isMatch ) return res.render('user/login', {message: 'email or password are wrong '});

      req.session.currentUser = {
        username: foundUser.username,
        userImg: foundUser.avatarImg,
        userId: foundUser._id
      }

      res.redirect('/');
    })
  });
}

const show = ( req, res ) => {
  const _id = req.params.userId
  
  db.User.findById( _id )
    .populate('posts')
    .exec((err, foundProfile) => {
      if (err) return res.status(500).json({
        status: 500,
        data: foundProfile,
        error: [{ message: 'Something went wrong. Please try again '}],
      });

      return res.render( 'user/profile', {user: foundProfile} );
    });
};


// Logout 
const logout = (req, res) => {
  if (!req.session.currentUser) return res.status(401).json({ status: 401, message: 'Unauthorized'});

  req.session.destroy( (err) =>  {
    if (err) return res.redirect('/users/signup');

    res.redirect('/users/signin');
  });
};


module.exports = {
  register,
  createUser,
  loginForm,
  login,
  logout,
  show,
}