const endpoint = "https://localhost:7206/api/JoinEvent";

const join = async (memberId, postId, isFollow, status) => {
  const model = {
    memberId: memberId,
    postId: postId,
    isFollow: isFollow,
    status: status,
  };
  const response = await fetch(`${endpoint}/Join`, {
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

const follow = async (memberId, postId, isFollow, status) => {
  const model = {
    memberId: memberId,
    postId: postId,
    isFollow: isFollow,
    status: status,
  };
  const response = await fetch(`${endpoint}/Follow`, {
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

const unjoin = async (memberId, postId, isFollow, status) => {
  const model = {
    memberId: memberId,
    postId: postId,
    isFollow: isFollow,
    status: status,
  };
  const response = await fetch(`${endpoint}/UnJoin`, {
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

const unfollow = async (memberId, postId, isFollow, status) => {
  const model = {
    memberId: memberId,
    postId: postId,
    isFollow: isFollow,
    status: status,
  };
  const response = await fetch(`${endpoint}/UnFollow`, {
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

export { join, follow, unjoin, unfollow };
