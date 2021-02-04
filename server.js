//EXTERNAL MODULES
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
// const passport = require('passport');
const MongoStore = require('connect-mongo')(session);

//INTERNAL MODULES
const routes = require('./routes');

// //implement .env variables
require('dotenv').config()

//.define port
const port = 3000;

//create express app
const app = express();


// //connect to database
require('./config/database');
// //connect to passport for oauth
// require('./config/passport');



//connect routes


//Set view engine to EJS
app.set('view engine', 'ejs');
/* Middleware */
app.use( express.static('public'));

/* for parsing application/x-www-form-urlencoded */
app.use( express.urlencoded({ extended: true }))

app.use( methodOverride('_method'));

// for our session 
app.use( session({
  store: new MongoStore({ url: process.env.MONGODB_URI }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 24 * 7 * 2 // two weeks 
    }
  }) 
);

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

// app listing
app.listen( PORT, () => console.log( `listing at port ${PORT} \nhttp://localhost:${PORT}`) );