const endpoint = "https://localhost:7206/api/Comment";

const createComment = async (memberId, postId, content) => {
  const model = {
    memberId: memberId,
    postId: postId,
    commentContent: content,
  };
  const response = await fetch(`${endpoint}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: model ? JSON.stringify(model) : undefined,
  });
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const replyComment = async (memberId, postId, commentId, content) => {
  const model = {
    memberId: memberId,
    postId: postId,
    commentContent: content,
    commentIDReply: commentId,
  };
  const response = await fetch(`${endpoint}/reply-comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: model ? JSON.stringify(model) : undefined,
  });
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const getComments = async () => {
  const response = await fetch(`${endpoint}/get-comment`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const getCommentsUser = async () => {
  const response = await fetch(`${endpoint}/get-comment-user`);
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

const updateComment = async (id, content) => {
  const model = {
    commentId: id,
    commentContent: content,
  };
  const response = await fetch(`${endpoint}/update-comment`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: model ? JSON.stringify(model) : undefined,
  });
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const deleteComment = async (id) => {
  const response = await fetch(`${endpoint}/delete-comment?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: undefined,
  });
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

export {
  createComment,
  replyComment,
  getComments,
  getCommentsUser,
  getCommentsByPost,
  updateComment,
  deleteComment,
};
