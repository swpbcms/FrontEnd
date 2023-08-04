// blog.js
import { getBlogs, createBlog } from "./services/blog.service.js";
// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js"; // Update the version
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-analytics.js"; // Update the version
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js"; // Update the version

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
    var loggedInManager = sessionStorage.getItem("loggedInManager");
    if (loggedInManager) {
      var manager = JSON.parse(loggedInManager);
  
      var managerFullName = manager.managerFullName;
      var managerImage = manager.managerImage;
      $('#fullname').html(managerFullName);
      $('#image').attr('src', managerImage);
  
      // Show the blog form when the manager is logged in
      const blogForm = document.getElementById("blogForm");
      blogForm.style.display = "block";
  
      // Add event listener for form submission
      blogForm.addEventListener("submit", handleCreateBlog);
      const createBlogFormContainer = document.querySelector(".create-blog-form-container");
      createBlogFormContainer.innerHTML = createBlogFormHTML;
    }
  });

  const blogForm = document.getElementById("blogForm");
if (blogForm) {
  blogForm.style.display = "block";

  // Add event listener for form submission
  blogForm.addEventListener("submit", handleCreateBlog);
  const createBlogFormContainer = document.querySelector(".create-blog-form-container");
  createBlogFormContainer.innerHTML = createBlogFormHTML;
}


  const uploadImageToStorage = async (file) => {
    // Get a reference to the Firebase Storage bucket
    const storage = getStorage();
  
    // Create a reference to the file in the bucket
    const storageRef = ref(storage, 'images/' + file.name);
  
    // Upload the file to Firebase Storage
    try {
      const snapshot = await uploadBytes(storageRef, file);
      console.log('Uploaded a file!', snapshot);
      // Get the download URL of the uploaded file
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image to Firebase Storage:', error);
      throw error;
    }
  };

// Function to display the list of blogs on the page
function displayBlogs(blogs, currentPage = 1, blogsPerPage = 4) {
  const blogContainer = document.getElementById("blog-posts");

  if (blogContainer) {
    let output = "";
    const startIdx = (currentPage - 1) * blogsPerPage;
    const endIdx = Math.min(startIdx + blogsPerPage, blogs.length);

    for (let i = startIdx; i < endIdx; i++) {
      const blog = blogs[i];
      const media = blog.media[0];
  
      // Check if the blog has media before attempting to access the linkMedia property
      const imageUrl = media ? media.linkMedia : "path-to-default-image.jpg";
  
      output += `
        <div class="blog-posts">
          <h4>${blog.blogTitle}</h4>
          <img src="${imageUrl}" alt="Blog Image">
          <a href="blog-detail.html?id=${blog.blogId}" class="read-more-btn">Xem thêm</a>
        </div>
      `;
    }
    blogContainer.innerHTML = output;
  }
}


function handlePagination(event) {
  const pageNumber = parseInt(event.target.getAttribute("data-page"));
  loadBlogs(pageNumber);
}

// Function to create pagination buttons
function createPaginationButtons(totalPages) {
  const paginationContainer = document.getElementById("pagination");
  if (paginationContainer) {
    let output = "";
    for (let i = 1; i <= totalPages; i++) {
      output += `<li><a href="#" data-page="${i}">${i}</a></li>`;
    }
    paginationContainer.innerHTML = output;
    const paginationLinks = paginationContainer.querySelectorAll("a");
    paginationLinks.forEach((link) => {
      link.addEventListener("click", handlePagination);
    });
  }
}

const createBlogFormHTML = `
<div class="post-new-popup">
  <div class="popup" style="width: 800px;">
    <span class="popup-closed"><i class="icofont-close"></i></span>
    <div class="popup-meta">
      <div class="popup-head">
        <h5><i>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" class="feather feather-plus">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg></i>Create New Blog
        </h5>
      </div>
      <div class="blog-new">
        <div class="blog-newmeta">
          <!-- The blog form -->
          <form id="blogForm">
            <label for="title">Title:</label><br>
            <input type="text" id="title" name="title" required><br><br>

            <label for="description">Description:</label><br>
            <textarea id="description" name="description" rows="4" cols="50" required></textarea><br><br>

            <label for="linkMedia">Media:</label><br>
            <input type="file" id="linkMedia" name="linkMedia" multiple><br><br>
            <div id="previewMedia"></div><br>

            <input type="submit" value="Create Blog">
          </form>
          <!-- End of blog form -->
        </div>
      </div>
    </div>
  </div>
</div>
`;

// Function to handle the API call and display blogs
const loadBlogs = async (currentPage = 1, blogsPerPage = 4) => {
  try {
    console.log("Fetching blogs...");
    const response = await getBlogs();
    console.log("API Response:", response);
    const blogs = response.data;
    const totalBlogs = blogs.length;
    const totalPages = Math.ceil(totalBlogs / blogsPerPage);

    // Call the displayBlogs function with the current page number
    displayBlogs(blogs, currentPage, blogsPerPage);

    // Create pagination buttons
    createPaginationButtons(totalPages);
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
  }
};

// Call the loadBlogs function when the page loads
window.addEventListener("load", loadBlogs);

// Function to redirect to the blog detail page when a blog is clicked
const redirectToBlogDetail = (blogId) => {
  window.location.href = `blog-detail.html?id=${blogId}`;
};

// Call the loadBlogs function when the page loads
window.addEventListener("load", loadBlogs);

