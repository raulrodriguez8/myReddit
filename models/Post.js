const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: String,
  text: String,
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type:  mongoose.Types.ObjectId,
    ref: 'User',
  },
  comments: [{
    type: mongoose.Types.ObjectId,
    ref: 'Comment',
  }],
  subreddits: {
    type: mongoose.Types.ObjectId,
    ref: 'Subreddit',
  }
});


const Post = mongoose.model('Post', postSchema )

module.exports = Post;
