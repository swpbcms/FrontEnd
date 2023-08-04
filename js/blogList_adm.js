import { getBlogs, deleteBlog, createBlog } from "./services/blog.service.js";

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
    blogListHTML += "<td><button class='uk-button uk-button-small create-blog-btn'>Create Blog</button></td>";
    blogListHTML += "<td><button class='uk-button uk-button-small uk-button-danger delete-blog-btn' data-blog-id='" + blog.blogId + "'>Delete</button></td>";
    blogListHTML += "</tr>";
  }
  
  blogListHTML += "</tbody></table></div>";

  $("#components-nav li:nth-child(6)").html(blogListHTML);

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
    // Show the create form
    showCreateForm();
  });

  $("#create-blog-form").on("submit", function (event) {
    event.preventDefault();
    // Get form data
    const title = $("#blog-title").val();
    const description = $("#blog-description").val();
    const managerId = ""; // Replace with the managerId (if applicable)
    const media = ""; // Replace with the media data (if applicable)

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