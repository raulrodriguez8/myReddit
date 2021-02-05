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
  userCreated: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
},
{
  timestamps: true
});


const Subreddit = mongoose.model('Subreddit', subredditSchema )

module.exports = Subreddit;
