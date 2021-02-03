const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        minlength: [5, 'Username must be 5 characters or more'],
        },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be 8 characters or more']
    },
    email: {
        type: String,
        required: true,
        },
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    avatarImg: {
        type: String,
    },
    posts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    }],
    googleId: String,
    });
    
module.exports = mongoose.model('User', userSchema);