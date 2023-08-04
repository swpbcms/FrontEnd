// Import the necessary functions from the API module
import { getBlogById } from './services/blog.service.js'; // Make sure the path to your api.js file is correct


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
  
  // Function to display blog details on the blog-detail.html page
  const getBlogIdFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
  };
  
  const loadBlogDetail = async () => {
    const blogId = getBlogIdFromUrl();
    try {
      const response = await getBlogById(blogId);
      const blog = response.data;
      console.log("Blog Detail:", blog);
      displayBlogDetail(blog);
    } catch (error) {
      console.error("Error fetching blog detail:", error.message);
    }
  };
  
  const displayBlogDetail = (blog) => {
    const blogTitleElement = document.getElementById("blogTitle");
    const blogDescriptionElement = document.getElementById("blogDescription");
    const blogMediaElement = document.getElementById("blogMedia");
  
    blogTitleElement.textContent = blog.blogTitle;
    blogDescriptionElement.textContent = blog.blogDescription;
  
    blog.media.forEach((media) => {
      const imageElement = document.createElement("img");
      imageElement.src = media.linkMedia;
      imageElement.alt = "Blog Image";
      blogMediaElement.appendChild(imageElement);
    });
  };
  
  window.addEventListener("load", loadBlogDetail);