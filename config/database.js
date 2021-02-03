const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

const db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});


db.on( 'disconnected', (err) => console.log(err) );

module.exports = {
    User: require('../models/User'),
    Post: require('../models/Post'),
    // Comment: require('../models/Comment'),
}