const express = require('express');
const { createThread } = require('../controllers/threadController');
const Thread = require('../models/Thread');
const { login, register } = require('../controllers/threadController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); 
const { getAllThreads } = require('../controllers/threadController');
const { getCommentsForThread } = require('../controllers/threadController');
const { createComment } = require('../controllers/commentController');
const { getLikes, likeThread, unlikeThread } = require('../controllers/threadController');

router.post('/threads', authMiddleware, createThread);
router.get('/threads', getAllThreads);
router.post('/threads/:threadId/comments', authMiddleware, createComment);
router.get('/threads/:threadId/comments', getCommentsForThread);
router.get('/threads/:threadId/likes', authMiddleware, getLikes);
router.post('/threads/:threadId/like', authMiddleware, likeThread);
router.post('/threads/:threadId/unlike', authMiddleware, unlikeThread);

module.exports = router;