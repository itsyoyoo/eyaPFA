const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/User');

const CommentSchema = new Schema({
    text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    thread: { type: Schema.Types.ObjectId, ref: 'Thread', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
