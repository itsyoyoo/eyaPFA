const mongoose = require('mongoose');
const User = require('../models/User');

const threadSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId, // Reference the 'Comment' model
        ref: 'Comment',
    }],
    likes: { 
        type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] 
    }, // Like functionality
}, { timestamps: true });

// Create and export the 'Thread' model
const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;
