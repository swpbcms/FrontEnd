const endpoint = "https://localhost:7206/api/Blog";

const getBlogs = async () => {
  const response = await fetch(`${endpoint}/All-Blog`);
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const getBlogById = async (blogId) => {
    const response = await fetch(`${endpoint}/Blog-id?id=${blogId}`);
    if (!response.ok) {
      throw new Error("Invalid Request");
    } else {
      return response.json();
    }
  };

  const createBlog = async (model) => {
    const response = await fetch(`${endpoint}/Insert-blog`, {
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

const updateBlog = async (blogData) => {
  const response = await fetch(`${endpoint}/Update-Blog`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  });
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

const deleteBlog = async (blogId) => {
  const response = await fetch(`${endpoint}/Blog-delete?Id=${blogId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Invalid Request");
  } else {
    return response.json();
  }
};

export { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
