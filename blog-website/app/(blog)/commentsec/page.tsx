"use client";
import React, { useState, useEffect } from "react";

const CommentSec = () => {
  const [username, setUsername] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<
    { username: string; comment: string }[]
  >([]);

  // Load comments from localStorage when component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedComments = localStorage.getItem("comments");
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      }
    }
  }, []);

  // Handle form submission and save comment
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && comment) {
      const newComment = { username, comment };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("comments", JSON.stringify(updatedComments));
      }
      setComment(""); // Clear the comment input after submission
    } else {
      alert("Please fill in both fields!");
    }
  };

  // Handle deleting a comment
  const handleDelete = (index: number) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);

    // Save the updated list to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("comments", JSON.stringify(updatedComments));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-md my-6">
      <h2 className="text-2xl font-bold mb-4">Comment Section</h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="comment"
          >
            Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Write your comment"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Comment
        </button>
      </form>

      {/* Display Comments */}
      <div className="mt-6 space-y-4">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div
              key={index}
              className="p-4 border rounded-md shadow-sm bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold">{comment.username}</p>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
              <p>{comment.comment}</p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSec;
