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

// Function to display blog details on the blog-detail.html page
const displayBlogDetails = async (blogId) => {
  try {
    // Fetch the blog details by its ID using the API function
    const blog = await getBlogById(blogId);

    // Check if the response contains the blog data
    if (blog) {
      // Extract the necessary data from the blog object
      const { title, content, imageURL } = blog;

      // Display the blog details on the blog-detail.html page
      document.getElementById('blog-title').innerText = title;
      document.getElementById('blog-content').innerText = content;
      document.getElementById('blog-image').setAttribute('src', imageURL);
    } else {
      // Handle the case when the blog is not found
      console.log('Blog not found.');
    }
  } catch (error) {
    // Handle any errors that might occur during the API call
    console.error('Error fetching blog details:', error.message);
  }
};

// Function to handle the click event on a blog
const handleBlogClick = (blogId) => {
  // Redirect the user to the blog-detail.html page
  window.location.href = `blog-detail.html?id=${blogId}`;
};

// Function to get the blog ID from the URL parameters
const getBlogIdFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
};

// Entry point of the script
document.addEventListener('DOMContentLoaded', () => {
  // Get the blog ID from the URL parameters
  const blogId = getBlogIdFromURL();

  // Check if a valid blog ID is present in the URL
  if (blogId) {
    // Display the blog details on the blog-detail.html page
    displayBlogDetails(blogId);
  } else {
    console.log('Invalid blog ID.');
  }
});

export { handleBlogClick };