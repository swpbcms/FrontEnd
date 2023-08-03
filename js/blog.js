// blog.js
import { getBlogs } from "./services/blog.service.js";

$(document).ready(function () {
    var loggedInMember = sessionStorage.getItem("loggedInMember");
    if (loggedInMember) {
      var mem = JSON.parse(loggedInMember);
  
      var memberFullName = mem.memberFullName;
      var memberImage = mem.memberImage;
      $("#fullname").html(memberFullName);
      $("#image").attr("src", memberImage);
    }
  });

// Function to display the list of blogs on the page
const displayBlogs = (blogs) => {
  const blogListContainer = document.querySelector(".blog-posts");
  blogListContainer.innerHTML = ""; // Clear previous blog list

  blogs.forEach((blog) => {
    // Create HTML elements for each blog
    const blogDiv = document.createElement("div");
    blogDiv.classList.add("blog-post"); // Add a new class for each blog post

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.setAttribute("src", blog.imageURL); // Assuming the API response has imageURL property for the blog image
    img.setAttribute("alt", blog.blogTitle); // Assuming the API response has blogTitle property for the blog title
    figure.appendChild(img);

    const blogPostMeta = document.createElement("div");
    blogPostMeta.classList.add("blog-post-meta");

    const blogTitle = document.createElement("h4");
    blogTitle.textContent = blog.blogTitle; // Assuming the API response has blogTitle property for the blog title

    const readMoreLink = document.createElement("a");
    readMoreLink.setAttribute("href", `blog-detail.html?id=${blog.blogId}`); // Assuming the API response has blogId property for the blog ID
    readMoreLink.textContent = "Read More";

    blogPostMeta.appendChild(blogTitle);
    blogPostMeta.appendChild(readMoreLink);

    blogDiv.appendChild(figure);
    blogDiv.appendChild(blogPostMeta);

    blogListContainer.appendChild(blogDiv);
  });
};

// Function to handle the API call and display blogs
const loadBlogs = async () => {
  try {
    const response = await getBlogs();
    const blogs = response.data; // Access the array of blogs from the 'data' property
    console.log("API Response:", blogs); // Log the API response to the console
    displayBlogs(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
  }
};

// Call the loadBlogs function when the page loads
window.addEventListener("load", loadBlogs);
