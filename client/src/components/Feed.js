import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../styles/Feed.css';
import Nav from "./Nav";
import Like from "./Like";

const Feed = () => {
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [comments, setComments] = useState({});
    const [newComments, setNewComments] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchThreads = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const response = await axios.get('http://localhost:5000/api/threads', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                const sortedThreads = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setThreads(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching threads');
                setLoading(false);
            }
        };

        fetchThreads();
    }, [navigate]);

    const fetchComments = async (threadId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/threads/${threadId}/comments`);
            console.log(response.data); // Check structure of comments data
            setComments((prev) => ({ ...prev, [threadId]: response.data }));
        } catch (error) {
            console.error("Error fetching comments", error);
        }
    };

    const handleCommentChange = (threadId, text) => {
        setNewComments((prev) => ({ ...prev, [threadId]: text }));
    };

    const handleCommentSubmit = async (threadId) => {
        try {
            const token = localStorage.getItem('token');
            const commentText = newComments[threadId] || '';
            await axios.post(
                `http://localhost:5000/api/threads/${threadId}/comments`,
                { text: commentText },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setNewComments((prev) => ({ ...prev, [threadId]: '' }));
            fetchComments(threadId);
        } catch (err) {
            console.error('Error posting comment:', err);
        }
    };

    if (loading) return <p>Loading threads...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Nav />
            <div className="feed-container">
                <h2>Latest Threads</h2>
                {threads.length > 0 ? (
                    threads.map((thread) => (
                        <div key={thread._id} className="thread-card">
                            <h3>{thread.title}</h3>
                            <p>{thread.description}</p>
                            <p className="thread-author">Posted by: {thread.user?.username} {thread.user?.lastname}</p>
                            <Like threadId={thread._id} />
                            <button className="comments-btn" onClick={() => fetchComments(thread._id)}>
                                Show Comments
                            </button>
                            <div className="comments">
    {comments[thread._id]?.map((comment) => (
        <p key={comment._id}>
                <p className="comment-author">{comment.user?.username} {comment.user?.lastname} : <small>{comment.text}</small></p>
        </p>
    ))}
</div>

                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={newComments[thread._id] || ''}
                                onChange={(e) => handleCommentChange(thread._id, e.target.value)}
                            /><button className="comments-btn" onClick={() => handleCommentSubmit(thread._id)}>Post Comment</button>
                        </div>
                    ))
                ) : (
                    <p>No threads to display.</p>
                )}
            </div>
        </>
    );
};

export default Feed;
