const mongoose = require('mongoose');


const voteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  commentId: {
    type: mongoose.Types.ObjectId,
    ref: 'Comment',
  },
  amount: {
    type: Number, 
  }
},
{
  timestamps: true
});


const Vote = mongoose.model('Vote', voteSchema )

module.exports = Vote;
