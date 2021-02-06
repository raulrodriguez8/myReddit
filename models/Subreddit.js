const mongoose = require('mongoose');


const subredditSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  posts: {
    type: mongoose.Types.ObjectId,
    ref: 'Post',
  }
},
{
  timestamps: true
});


const Subreddit = mongoose.model('Subreddit', subredditSchema )

module.exports = Subreddit;
