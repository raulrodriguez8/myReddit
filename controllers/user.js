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
        //set req.body.password value equal to the hash of this function
        req.body.password = hash
        console.log('after hash', req.body )
        //if no error, create user using the data pulled in from the form
        db.User.create( req.body, ( err, createdUser ) => {
          if ( err ) return console.log(err);
          //if the user can't be created because they exist already...send them to sign in page
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
  //if the user leaves the form empty, redirect them back to the blank form
  if ( req.body.email === '' || 
  req.body.password === '' ) return res.render('user/login');
  //search DB for user based on e-mail address
  db.User.findOne( { email: req.body.email }, ( err, foundUser ) => {
    //if the data passed fails, send to login page
    if ( err ) return res.render('user/login')
    //if the user can't be found...send back to login page
    if ( !foundUser ) return res.render('user/login')
    //compare the hashed password passed in by user to the one on the DB for same person
    bcrypt.compare( req.body.password, foundUser.password, ( err, isMatch ) => {
      //if you can't do it, send them back to login
      if ( err ) return res.render('user/login')
      //if hashed password passed in does not match the hashed password in DB, error message and send back to login page
      if ( !isMatch ) return res.render('user/login', {message: 'email or password are wrong '});
      //once two iff statements are bypassed, create a currentUser object on the session to track who's logged in using username/image/id
      req.session.currentUser = {
        username: foundUser.username,
        userImg: foundUser.avatarImg,
        userId: foundUser._id
      }
      //then send the logged in user session to the post router
      res.redirect('/');
    })
  });
}

//present the user
const show = ( req, res ) => {
  //set variable _id equal to passed in/authenticated userId
  const _id = req.params.userId
  //find user in DB using the userId
  db.User.findById( _id )
    //get all the posts from the Post schema
    .populate('posts')
    //if lookup fails, send error message
    .exec((err, foundProfile) => {
      if (err) return res.status(500).json({
        status: 500,
        data: foundProfile,
        error: [{ message: 'Something went wrong. Please try again '}],
      });
      //otherwise, send to views/user/profile
      return res.render( 'user/profile', {user: foundProfile} );
    });
};


// Logout 
const logout = (req, res) => {
  //if there is no user session (meaning they didn't authenticate in the first place) then they are unauthorized
  if (!req.session.currentUser) return res.status(401).json({ status: 401, message: 'Unauthorized'});
  //otherwise destroy the session
  req.session.destroy( (err) =>  {
    //if you can't destroy, then just send them to signup screen
    if (err) return res.redirect('/users/signup');
    //send them to the sign in screen once session destroyed
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