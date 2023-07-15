const endpoint = "https://localhost:7206/api/Like";

const like = async (memberId, postId) => {
  const model = {
    memberId: memberId,
    postId: postId,
    dateTime: new Date(),
  };
  console.log(model);
  const response = await fetch(`${endpoint}/Like`, {
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

const dislike = async (memberId, postId) => {
  const model = {
    memberId: memberId,
    postId: postId,
    dateTime: new Date(),
  };
  const response = await fetch(`${endpoint}/Dislike`, {
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

export { like, dislike };
