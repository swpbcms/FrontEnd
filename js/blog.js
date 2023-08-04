// blog.js
import { getBlogs, createBlog } from "./services/blog.service.js";
import { getMedia } from "./services/media.service.js"; // Add this line
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
      // const blogForm = document.getElementById("blogForm");
      // blogForm.style.display = "block";
  
      // // Add event listener for form submission
      // blogForm.addEventListener("submit", handleCreateBlog);
      // const createBlogFormContainer = document.querySelector(".create-blog-form-container");
      // createBlogFormContainer.innerHTML = createBlogFormHTML;
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
const displayBlogs = async (blogs) => { // Make the function asynchronous
  const blogListContainer = document.querySelector(".blog-posts");
  blogListContainer.innerHTML = ""; // Clear previous blog list

  for (const blog of blogs) { // Use a for...of loop to iterate over blogs
    // Create HTML elements for each blog
    const blogDiv = document.createElement("div");
    blogDiv.classList.add("blog-post"); // Add a new class for each blog post

    const figure = document.createElement("figure");
    const img = document.createElement("img");

    try {
      // Get the media (image) for the current blog post from the API
      const mediaResponse = await getMedia(blog.blogId);
      if (mediaResponse.length > 0) {
        const media = mediaResponse[0]; // Assuming the API returns an array of media, and we take the first item
        img.setAttribute("src", media.linkMedia);
        img.setAttribute("alt", blog.blogTitle);
      } else {
        // If there is no media for this blog post, you can set a default image
        img.setAttribute("src", "path/to/default-image.jpg");
        img.setAttribute("alt", "Default Alt Text");
      }
    } catch (error) {
      console.error("Error fetching media:", error.message);
      // If there's an error while fetching media, you can set a default image as well
      img.setAttribute("src", "path/to/default-image.jpg");
      img.setAttribute("alt", "Default Alt Text");
    }

    figure.appendChild(img);

    const blogPostMeta = document.createElement("div");
    blogPostMeta.classList.add("blog-post-meta");

    const blogTitle = document.createElement("h4");
    blogTitle.textContent = blog.blogTitle;

    const readMoreLink = document.createElement("a");
    readMoreLink.setAttribute("href", `blog-detail.html?id=${blog.blogId}`);
    readMoreLink.textContent = "Read More";

    blogPostMeta.appendChild(blogTitle);
    blogPostMeta.appendChild(readMoreLink);

    blogDiv.appendChild(figure);
    blogDiv.appendChild(blogPostMeta);

    blogListContainer.appendChild(blogDiv);
  }
};

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

const handleCreateBlog = async (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const mediaLinksInput = document.getElementById("linkMedia");
  const mediaLinks = mediaLinksInput.files;
  const media = [];

  // Get media (image) for the blog post
  for (let i = 0; i < mediaLinks.length; i++) {
    const file = mediaLinks[i];
    try {
      const downloadURL = await uploadImageToStorage(file);
      media.push({ linkMedia: downloadURL });
    } catch (error) {
      console.error("Error uploading image to Firebase Storage:", error);
      // Handle error if needed
    }
  }

  const loggedInManager = JSON.parse(sessionStorage.getItem("loggedInManager"));
  const blogData = {
    blogTitle: title,
    blogDescription: description,
    managerId: loggedInManager.managerId,
    media: media,
    // Add other required data fields for creating a blog post
  };

  try {
    const response = await createBlog(blogData);
    console.log("Blog created successfully:", response);
    // Do something with the response if needed
    window.location.href = "index.html"; // Redirect to the desired page after successful creation
  } catch (error) {
    console.error("Error creating blog:", error.message);
    // Handle error if needed
  }
};
