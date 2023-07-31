const endpoint = "https://localhost:7206/api/Comment";

const getComments = async () => {
  const response = await fetch(
    `${endpoint}/get-comment`
  )
  if (!response.ok) {
    throw new Error("Invalid Request");
  }else{
    return response.json();
  }
};

const getCommentsByPost = async (postId) => {
    const response = await fetch(
      `${endpoint}/get-comment`
    )
    if (!response.ok) {
      throw new Error("Invalid Request");
    }else{
      return response.json();
    }
  };

export { getComments, getCommentsByPost };
