const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  postUrl: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  subredditId: {
    type: mongoose.Types.ObjectId,
    ref: 'Subreddit',
  }
},
{
  timestamps: true
});


const Post = mongoose.model('Post', postSchema )

module.exports = Post;
