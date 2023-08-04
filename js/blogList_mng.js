import { getBlogs, deleteBlog, createBlog } from "./services/blog.service.js";

$(document).ready(function () {
    var loggedInManager = sessionStorage.getItem("loggedInManager");
    if (loggedInManager) {
      var manager = JSON.parse(loggedInManager);
  
      var managerFullName = manager.managerFullName;
      var managerImage = manager.managerImage;
      $('#fullname').html(managerFullName);
      $('#image').attr('src', managerImage);
    }
  });

$(document).ready(function () {
  loadBlogList();
});

function loadBlogList() {
  getBlogs()
    .then((response) => {
      if (response && response.data) {
        // Process the blog list data and display it on the page
        var blogs = response.data;

        // Display blog list
        displayBlogList(blogs);
      } else {
        $("#components-nav li:nth-child(5)").html("<h2>Quản lý Blog</h2><p>No blogs found.</p>");
      }
    })
    .catch((error) => {
      console.log('An error occurred while fetching blog list: ' + error);
      $("#components-nav li:nth-child(5)").html("<h2>Quản lý Blog</h2><p>Failed to fetch blog list.</p>");
    });
}

function displayBlogList(blogs) {
  var blogListHTML = "<h2>Quản lý Blog</h2>";
  blogListHTML += "<td><button class='uk-button uk-button-medium create-blog-btn'>Create Blog</button></td>";
  blogListHTML += "<div class='table-responsive'><table class='uk-table uk-table-hover uk-table-divider'>";
  blogListHTML += "<colgroup>"; // Add a colgroup to define column widths
  blogListHTML += "<col style='width: 5%'>"; // ID column (5% width)
  blogListHTML += "<col style='width: 20%'>"; // Tiêu đề column (20% width)
  blogListHTML += "<col style='width: 15%'>"; // Ngày tạo column (15% width)
  blogListHTML += "<col style='width: 25%'>"; // Mô tả column (25% width)
  blogListHTML += "<thead><tr><th>ID</th><th>Tiêu đề</th><th>Ngày tạo</th><th>Mô tả</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>";

  for (var i = 0; i < blogs.length; i++) {
    var blog = blogs[i];
  
    blogListHTML += "<tr>";
    blogListHTML += "<td>" + blog.blogId + "</td>";
    blogListHTML += "<td class='wrap-text'>" + blog.blogTitle + "</td>";
    blogListHTML += "<td>" + formatDate(blog.datetime) + "</td>";
    blogListHTML += "<td class='wrap-text'>" + blog.blogDescription + "</td>";
    blogListHTML += "<td>" + (blog.status ? "Active" : "Inactive") + "</td>";
    blogListHTML += "<td><button class='uk-button uk-button-small uk-button-danger delete-blog-btn' data-blog-id='" + blog.blogId + "'>Delete</button></td>";
    blogListHTML += "</tr>";
  }
  
  blogListHTML += "</tbody></table></div>";

  $("#components-nav li:nth-child(5)").html(blogListHTML);

  $(".delete-blog-btn").on("click", function () {
    const blogId = $(this).data("blog-id");

    // Show a confirmation dialog before proceeding with the deletion
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this blog?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the deleteBlog function to delete the blog
        deleteBlog(blogId)
          .then(() => {
            // Remove the blog row from the table after successful deletion
            $(this).closest("tr").remove();
            loadBlogList();
          })
          .catch((error) => {
            console.error("Error deleting blog: ", error);
          });
      }
    });
  });

  $(".create-blog-btn").on("click", function () {
    // Show Swal.fire with the form fields
    Swal.fire({
      title: 'Create Blog',
      html: `
        <form id="create-blog-form">
          <div class="uk-margin">
            <label class="uk-form-label" for="blog-title">Title</label>
            <input class="uk-input" type="text" id="blog-title" required>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="blog-description">Description</label>
            <textarea class="uk-textarea" id="blog-description" required></textarea>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="blog-image">Image</label>
            <input type="file" id="blog-image">
          </div>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        // Handle form submission in preConfirm function
        const blogTitle = $("#blog-title").val();
        const blogDescription = $("#blog-description").val();
        var loggedInManager = sessionStorage.getItem("loggedInManager");
        if (!loggedInManager) {
          console.error("Manager not logged in.");
          return;
        }

        var managerId = JSON.parse(loggedInManager).managerId;
        // Get the selected image file and convert it to base64
        const imageFile = $("#blog-image")[0].files[0];

        // Validate if title and description are provided
        if (!blogTitle || !blogDescription) {
          Swal.showValidationMessage("Title and Description are required.");
          return;
        }

        return new Promise((resolve, reject) => {
          if (imageFile) {
            const reader = new FileReader();
            reader.onloadend = function () {
              // Convert the image to base64-encoded string
              const base64Image = reader.result.split(",")[1];
              resolve({ blogTitle, blogDescription, managerId, media: [{ linkMedia: base64Image }] });
            };
            reader.readAsDataURL(imageFile);
          } else {
            // If no image is selected, resolve with an empty media value
            resolve({ blogTitle, blogDescription, managerId, media: [] });
          }
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the createBlog function to create a new blog
        createBlog(result.value)
          .then(() => {
            // Reload the blog list to reflect the changes after successful creation
            loadBlogList();
          })
          .catch((error) => {
            console.error("Error creating blog: ", error);
          });
      }
    });
});
  

  $("#create-blog-form").on("submit", function (event) {
    event.preventDefault();
    // Get form data
    const title = $("#blog-title").val();
    const description = $("#blog-description").val();

    var loggedInManager = sessionStorage.getItem("loggedInManager");
    if (!loggedInManager) {
      console.error("Manager not logged in.");
      return;
    }
  
    var managerId = JSON.parse(loggedInManager).managerId;    
    const media = $("#blog-image").val(); // Replace with the media data (if applicable)

    // Call the createBlog function to create a new blog
    createBlog(title, description, managerId, media)
      .then(() => {
        // Reload the blog list to reflect the changes after successful creation
        loadBlogList();
        // Hide the create form after successful creation
        hideCreateForm();
      })
      .catch((error) => {
        console.error("Error creating blog: ", error);
      });
  });

  function formatDate(dateString) {
    var date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}

function showCreateForm() {
  $("#create-blog-form").show();
}

function hideCreateForm() {
  $("#create-blog-form").hide();
}