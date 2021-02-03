const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema ({
    title: {
        type: String,
        required: true,
        minlength: [3, 'Title must be 3 chars or more'],
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
    _creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
        },
    });
    
module.exports = mongoose.model('Post', postSchema);