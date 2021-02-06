const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
  _creator: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  _post: {
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
