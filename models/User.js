const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarImg: {
    type: String,
    default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkPTBqSDcbuon4InYVkJLQ5Q2nA93cYBr1eQ&usqp=CAU'
  },
  posts: [{
    type: mongoose.Types.ObjectId,
    ref: 'Post'
  }],
},
{
  timestamps: true
});

const User = mongoose.model( 'User', userSchema );

module.exports = User;

//removed followers/following, firstname/lastname
