const endpoint = "https://localhost:7206/api/Media";

const getMedia = async (postId) => {
  const response = await fetch(`${endpoint}/All-media?postID=${postId}`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};


const createMedia = async (postId, linkMedia, status) => {
  const model = {
    postId: postId,
    linkMedia: linkMedia,
    status: status,
  };
  const response = await fetch(`${endpoint}/create-media`, {
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

const updateMedia = async (mediaId, postId, linkMedia, status) => {
  const model = {
    mediaId: mediaId,
    postId: postId,
    linkMedia: linkMedia,
    status: status,
  };
  const response = await fetch(`${endpoint}/update-media`, {
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

const deleteMedia = async (id) => {
  const response = await fetch(`${endpoint}/delete-media?id=${id}`, {
    method: "POST",
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

export { getMedia, createMedia, updateMedia, deleteMedia };
