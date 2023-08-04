const endpoint = "https://localhost:7206/api/Post";

const createPost = async (
  title,
  description,
  eventLocation,
  eventStartDate,
  eventEndDate,
  memberId,
  categories,
  media
) => {
  const model = {
    postTitle: title,
    postDescription: description,
    postIsEvent: true,
    eventLocation: eventLocation,
    eventStartDate: eventStartDate,
    eventEndDate: eventEndDate,
    memberId: memberId,
    categories: categories,
    media: media,
  };
  const response = await fetch(`${endpoint}/create-post`, {
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

const getPosts = async () => {
  const response = await fetch(`${endpoint}/get-post`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};


const getJoinPosts = async (id) => {
  const response = await fetch(`${endpoint}/get-join-post?id=${id}`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const getLikePosts = async (id) => {
  const response = await fetch(`${endpoint}/get-like-post?id=${id}`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const getPostsId = async (id) => {
  const response = await fetch(`${endpoint}/get-post-id?id=${id}`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const getPostsUser = async () => {
  const response = await fetch(`${endpoint}/get-postuser`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const searchPostsUser = async (searchString) => {
  const response = await fetch(
    `${endpoint}/search-postuser?search=${searchString}`
  );
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const searchPostsManager = async () => {
  const response = await fetch(`${endpoint}/search-postManager`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const updatePost = async (
  id,
  title,
  description,
  eventLocation,
  eventStartDate,
  eventEndDate,
  memberId,
  categories,
  media
) => {
  const model = {
    postId: id,
    postTitle: title,
    postDescription: description,
    postIsEvent: true,
    eventLocation: eventLocation,
    eventStartDate: eventStartDate,
    eventEndDate: eventEndDate,
    memberId: memberId,
    categories: categories,
    media: media,
  };
  const response = await fetch(`${endpoint}/update-post`, {
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


const deletePost = async (id) => {
  const response = await fetch(`${endpoint}/detele-post?id=${id}`, {
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


const moderatePost = async (id, option, managerID) => {
  const response = await fetch(`${endpoint}/moderate-post?id=${id}&option=${option}&managerID=${managerID}`, {
    method: "PUT",
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

const reStatusPost = async (id) => {
  const response = await fetch(`${endpoint}/restatus-post?dto=${id}`, {
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

export {
  createPost,
  getPosts,
  getJoinPosts,
  getLikePosts,
  getPostsUser,
  searchPostsUser,
  searchPostsManager,
  updatePost,
  deletePost,
  moderatePost,
  reStatusPost,
  getPostsId
};
