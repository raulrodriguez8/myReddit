const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: 'Post',
  },
  text: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Comment = mongoose.model('Comment', commentSchema )

module.exports = Comment;
