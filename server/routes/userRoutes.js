const express = require('express');
const { login, register, profile } = require('../controllers/userController.js'); // Import both functions
const authMiddleware = require('../middleware/authMiddleware.js');
const router = express.Router();
const { updateUser } = require('../controllers/userController');
const { deleteUser } = require('../controllers/userController');

router.post('/login', login);
router.post('/register', register);
router.get('/profile' , authMiddleware, profile );
router.put('/profile', authMiddleware, updateUser);
router.delete('/profile', authMiddleware, deleteUser);

module.exports = router;
