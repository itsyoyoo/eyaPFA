const Thread = require('../models/Thread');
const Comment = require('../models/Comment')
// Create a thread
const createThread = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;


    try {
        const newThread = new Thread({
            title,
            description,
            user: userId,
        });
        await newThread.save();
        
        res.status(201).json({ message: 'Thread created successfully', thread: newThread });
    } catch (err) {
        res.status(500).json({ error_message: 'Error creating thread', err });
    }
};
const getAllThreads = async (req, res) => {
    try {
        const threads = await Thread.find().populate('user', 'username lastname'); // Fetch all threads from the database
        res.status(200).json(threads); // Send threads back to frontend
    } catch (error) {
        res.status(500).json({ message: "Error fetching threads", error });
    }
};
// Get comments for a thread
const getCommentsForThread = async (req, res) => {
    const { threadId } = req.params;

    try {
        // Fetch comments and populate the user field
        const comments = await Comment.find({ thread: threadId })
            .populate('user', 'username lastname'); // Populate user fields

        res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching comments", error });
    }
};


// Fetch likes and user's like status
const getLikes = async (req, res) => {
    const { threadId } = req.params;
    const userId = req.user.id; // Assuming user ID is attached by authentication middleware

    try {
        const thread = await Thread.findById(threadId);

        if (!thread) {
            return res.status(404).json({ message: 'Thread not found' });
        }

        const likeCount = thread.likes.length;
        const isLiked = thread.likes.includes(userId);

        res.status(200).json({ likeCount, isLiked });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching likes' });
    }
};

// Add a like
const likeThread = async (req, res) => {
    const { threadId } = req.params;
    const userId = req.user.id;

    try {
        const thread = await Thread.findById(threadId);

        if (!thread) {
            return res.status(404).json({ message: 'Thread not found' });
        }

        if (!thread.likes.includes(userId)) {
            thread.likes.push(userId);
            await thread.save();
        }

        res.status(200).json({ message: 'Thread liked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error liking thread' });
    }
};

// Remove a like
const unlikeThread = async (req, res) => {
    const { threadId } = req.params;
    const userId = req.user.id;

    try {
        const thread = await Thread.findById(threadId);

        if (!thread) {
            return res.status(404).json({ message: 'Thread not found' });
        }

        if (thread.likes.includes(userId)) {
            thread.likes = thread.likes.filter((id) => id !== userId);
            await thread.save();
        }

        res.status(200).json({ message: 'Thread unliked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error unliking thread' });
    }
};



module.exports = { createThread , getAllThreads ,getCommentsForThread, getLikes, likeThread, unlikeThread};
