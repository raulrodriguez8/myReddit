const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
// .then( () => console.log('MongoDB connection ESTABLISHED :)'))
// .catch( (err) => console.log('MongoDB error', err))


mongoose.connection.on( 'disconnected', (err) => console.log(err) );

module.exports = {
    User: require('../models/User'),
    Post: require('../models/Post'),
    // Comment: require('../models/Comment'),
}