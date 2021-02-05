const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  postId: {
    type: mongoose.Types.ObjectId,
    ref: 'Post',
  },
  text: {
    type: String,
    required: true,
  }
},
{
  timestamps: true
});


const Comment = mongoose.model('Comment', commentSchema )

module.exports = Comment;
