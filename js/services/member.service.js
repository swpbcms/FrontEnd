const endpoint = "https://localhost:7206/api/Member";

const getMembers = async () => {
  const response = await fetch(`${endpoint}/All-Member`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    const data = await response.json();
    console.log(data);
    return data.data;
  }
};

const getMembersByName = async (name) => {
  const response = await fetch(`${endpoint}/Name-Member?name=${name}`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const getMemberByID = async (id) => {
  const response = await fetch(`${endpoint}/ID-Member?id=${id}`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const login = async (username, password) => {
  const model = {
    memberUserName: username,
    memberPassword: password,
  };
  const response = await fetch(`${endpoint}/login-Member`, {
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

const register = async (
  username,
  password,
  gender,
  imageUrl,
  fullName,
  email,
  dob
) => {
  const model = {
    memberUserName: username,
    memberPassword: password,
    memberGender: gender,
    memberImage: imageUrl,
    memberFullName: fullName,
    memberEmail: email,
    memberDob: dob,
  };
  const response = await fetch(`${endpoint}/Register-Member`, {
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

const updateMember = async (
  id,
  username,
  password,
  gender,
  imageUrl,
  fullName,
  email,
  dob
) => {
  const model = {
    memberId: id,
    memberUserName: username,
    memberPassword: password,
    memberGender: gender,
    memberImage: imageUrl,
    memberFullName: fullName,
    memberEmail: email,
    memberDob: dob,
  };
  const response = await fetch(`${endpoint}/Update-Member`, {
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

const deleteMember = async (id) => {
  const response = await fetch(`${endpoint}/Delete-member?id=${id}`, {
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
  getMembers,
  getMembersByName,
  getMemberByID,
  login,
  register,
  updateMember,
  deleteMember,
};
