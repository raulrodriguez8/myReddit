const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [5, 'Username must be 5 characters or more.']
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be 8 characters or more.'],
  },
  avatarImg: {
    type: String,
    default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkPTBqSDcbuon4InYVkJLQ5Q2nA93cYBr1eQ&usqp=CAU'
  },
  posts: [{
    type: mongoose.Types.ObjectId,
    ref: 'Post'
  }],
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // googleId: String,
});

const User = mongoose.model( 'User', userSchema );

module.exports = User;

//removed followers/following, firstname/lastname
