import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"; // React icons
import "../styles/Like.css";

const Like = ({ threadId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  // Fetch initial likes and like status on mount
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/threads/${threadId}/likes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Assuming the response contains { likeCount, isLiked }
        setLikeCount(response.data.likeCount);
        setLiked(response.data.isLiked);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [threadId]);

  // Handle like/unlike toggle
  const handleLikeToggle = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = liked
        ? `http://localhost:5000/api/threads/${threadId}/unlike`
        : `http://localhost:5000/api/threads/${threadId}/like`;

      await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state
      setLiked(!liked);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Error toggling like:", error);
      alert("An error occurred while toggling the like.");
    }
  };

  return (
    <button
      className={`like-button ${liked ? "liked" : ""}`}
      onClick={handleLikeToggle}
    >
      {liked ? (
        <AiFillHeart className="like-icon liked" />
      ) : (
        <AiOutlineHeart className="like-icon" />
      )}
      <span>{likeCount}</span>
    </button>
  );
};

export default Like;
