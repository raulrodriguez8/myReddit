const mongoose = require('mongoose');


const voteSchema = new mongoose.Schema({
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


const Vote = mongoose.model('Vote', voteSchema )

module.exports = Vote;
