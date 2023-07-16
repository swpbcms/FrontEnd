const endpoint = "https://localhost:7206/api/ProcessEvent";

const getProcessEvents = async () => {
  const response = await fetch(`${endpoint}/get-all`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const getProcessEventsByPost = async (postId) => {
  const response = await fetch(`${endpoint}/get-for-post?postid=${postId}`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const createProcessEvent = async (postId, eventRule, eventReward) => {
  const model = {
    postId: postId,
    eventRule: eventRule,
    eventReward: eventReward,
  };
  const response = await fetch(`${endpoint}/create-process`, {
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

const updateProcessEvent = async (
  processEventId,
  postId,
  eventRule,
  eventReward
) => {
  const model = {
    processId: processEventId,
    postId: postId,
    eventRule: eventRule,
    eventReward: eventReward,
  };
  const response = await fetch(`${endpoint}/update-process`, {
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

export {
  getProcessEvents,
  getProcessEventsByPost,
  createProcessEvent,
  updateProcessEvent,
};
