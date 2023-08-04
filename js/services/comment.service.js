const endpoint = "https://localhost:7206/api/Comment";

const getComments = async () => {
  const response = await fetch(`${endpoint}/get-comment`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const getCommentsByPost = async (postId) => {
  const response = await fetch(`${endpoint}/get-comment-post?postid=${postId}`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const replyToComment = async (commentData) => {
  const response = await fetch(`${endpoint}/reply-comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });

  if (!response.ok) {
    throw new Error("Failed to reply to comment");
  } else {
    return response.json();
  }
};

export { getComments, getCommentsByPost, replyToComment };
