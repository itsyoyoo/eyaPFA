const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    lastname: { type: String, required: true },
    grade: { type: String, required: true },
    matricule: { type: String, required: true, unique: true },
    placeOfWork: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
