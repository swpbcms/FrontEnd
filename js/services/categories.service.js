const endpoint = "https://localhost:7206/api/Category";

const getCategories = async () => {
  const response = await fetch(`${endpoint}/All-Category`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const getCategoryByName = async (name) => {
  const response = await fetch(`${endpoint}/Name-Category?name=${name}`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const getCategoryByID = async (id) => {
  const response = await fetch(`${endpoint}/ID-Category?id=${id}`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const createCategory = async (name, description) => {
  const model = {
    categoryName: name,
    description: description,
  };
  const response = await fetch(`${endpoint}/Insert-Category`, {
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

const updateCategory = async (id, name, description) => {
  const model = {
    categoryId: id,
    categoryName: name,
    description: description,
  };
  const response = await fetch(`${endpoint}/Update-Category`, {
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
  getCategories,
  getCategoryByName,
  getCategoryByID,
  createCategory,
  updateCategory,
};
