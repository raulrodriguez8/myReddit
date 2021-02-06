/* EXTERNAL MODULES */
const express = require ('express');
const methodOverride = require('method-override');
const session = require('express-session');
// const passport = require('passport');
const MongoStore = require('connect-mongo')(session);

/* INTERNAL MODULES */
const routes = require('./routes')


// require('./config/passport');

/* PORT */
require('dotenv').config()
const PORT = process.env.PORT;

//create express app
const app = express()


/* APP CONFIG */
app.set( 'view engine', 'ejs' );

/* Middleware */
app.use( express.static('public'));

/* for parsing application/x-www-form-urlencoded */
app.use( express.urlencoded({ extended: true }))

app.use( methodOverride('_method'));

// for our session 
app.use( session({
  store: new MongoStore({ url: process.env.MONGODB_URI }),
  secret: 'raultest',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 24 * 7 * 2 // two weeks 
    }
  }) 
);

//Passport
// app.use(passport.initialize());
// app.use(passport.session());

// find out what this does
app.use( ( req, res, next ) => {
  console.log(`${req.method} ${req.originalUrl}`)
  next();
})

// user authentication middleware
app.use( ( req, res, next)  => {
  app.locals.currentUser =  req.session.currentUser;
  next();
});

/* routes */
// post routes
app.use( '/', routes.post ) ;

// users routes 
app.use('/users', routes.user );

// app listening port
app.listen( PORT, () => console.log( `listening on port ${PORT} \nhttp://localhost:${PORT}`) );
