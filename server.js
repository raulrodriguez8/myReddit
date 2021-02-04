//EXTERNAL MODULES
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);

//.define port
const port = 3000;

//create express app
const app = express();

//implement .env variables
require('dotenv').config()
//connect to database
require('./config/database');
//connect to passport for oauth
require('./config/passport');



//connect routes
const routes = require('./routes');


//Set view engine to EJS
app.set('view engine', 'ejs');
//initialize morgan
app.use(morgan('dev'));
//initialize json for POST requests
app.use(express.json());
//initialize urlencoded for POST requests
app.use(express.urlencoded({ extended: false }));
app.use( methodOverride('_method'));
//used to serve static files (images/css/js) from PUBLIC directory
app.use(express.static('public'));

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
 // using passport
 app.use(passport.initialize());
 app.use(passport.session());

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
// user lands on the post route
// app.use( '/', routes.post ) ;

// users route is available as well 
// app.use('/users', routes.user );


// Home landing page (for testing) http://localhost:3000
app.get( '/', ( req, res ) => {
  res.send('<h1>myReddit!</h1><a href="/users/login" >Log in to myReddit</a>');
  });

app.listen(port, () => {
  console.log(`Express is listening on port:${port}`);
});
