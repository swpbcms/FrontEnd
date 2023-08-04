const endpoint = "https://localhost:7206/api/Manager";

const getManagers = async () => {
  const response = await fetch(`${endpoint}/All-Manager`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const getManagersByName = async (name) => {
  const response = await fetch(`${endpoint}/Name-Manager?name=${name}`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const getManagersById = async (id) => {
  const response = await fetch(`${endpoint}/Name-Manager?ID-Manager?id=${id}`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const login = async (username, password) => {
  const model = {
    managerUserName: username,
    managerPassword: password,
  };
  const response = await fetch(`${endpoint}/login-Manager`, {
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

const register = async (model) => {
  
  const response = await fetch(`${endpoint}/Register-Manager`, {
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

const updateManager = async (
  id,
  username,
  phone,
  password,
  imageUrl,
  fullName,
  email
) => {
  const model = {
    managerID: id,
    managerUserName: username,
    managerPhone: phone,
    managerPassword: password,
    managerEmail: email,
    managerFullName: fullName,
    managerImage: imageUrl,
  };
  const response = await fetch(`${endpoint}/Update-Manager`, {
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

const deleteManager = async (id) => {
  const response = await fetch(`${endpoint}/Delete-Manager?id=${id}`, {
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

const moderateMem = async (id) => {
  const response = await fetch(`${endpoint}/moderate-mem?memid=${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ memberId: id }), // Pass the member ID in the request body
  });
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

export {
  getManagers,
  getManagersByName,
  getManagersById,
  login,
  register,
  updateManager,
  deleteManager,
  moderateMem,
};
