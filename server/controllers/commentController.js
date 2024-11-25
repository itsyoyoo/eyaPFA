const Comment = require('../models/Comment');
const Thread = require('../models/Thread');

// Add a comment to a thread
const createComment = async (req, res) => {
    const { text } = req.body;  // Ensure 'text' is extracted from body
    const { threadId } = req.params;  // Use threadId from params if that’s expected
    const userId = req.user.id;
    if (!userId) {
        console.error("User ID is undefined.");
        return res.status(400).json({ error_message: "User ID is required." });
    }
    console.log("User ID:", userId);
    console.log("Thread ID:", threadId);
    console.log("Comment Text:", text);

    try {
        if (!text || !threadId) {
            return res.status(400).json({ message: "Text and Thread ID are required" });
        }

        const newComment = new Comment({
            text,
            thread: threadId,
            user: userId,
        });

        await newComment.save();

        await Thread.findByIdAndUpdate(threadId, {
            $push: { comments: newComment._id },
        });

        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (err) {
        console.error('Error in createComment:', err);  // Log detailed error
        res.status(500).json({ error_message: 'Error adding comment', error: err.message });
    }
};


module.exports = { createComment };
