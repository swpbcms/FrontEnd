import { getPosts, deletePost, moderatePost } from "./services/post.service.js";

$(document).ready(function () {
  loadPostList();
  loadEventPostList();
});

function loadEventPostList() {
  $.ajax({
    url: "https://localhost:7206/api/Post/get-post",
    type: "GET",
    dataType: "json",
    success: function (response) {
      // Handle API response
      if (response && response.data) {
        // Filter event posts
        var eventPosts = response.data.filter(function (post) {
          return post.postIsEvent === true;
        });

        // Display event post list with both delete and agree buttons
        displayEventList(eventPosts);
      } else {
        console.log("Failed to fetch post list");
      }
    },
    error: function (error) {
      console.log("An error occurred while fetching post list: " + error);
    },
  });
}

function loadPostList() {
  $.ajax({
    url: "https://localhost:7206/api/Post/get-post",
    type: "GET",
    dataType: "json",
    success: function (response) {
      // Handle API response
      if (response && response.data) {
        // Process the post list data and display it on the page
        var posts = response.data;

        // Display post list with both delete and agree buttons
        displayPostList(posts);
      } else {
        console.log("Failed to fetch post list");
      }
    },
    error: function (error) {
      console.log("An error occurred while fetching post list: " + error);
    },
  });
}

function displayPostList(posts) {
  var postListHTML = "<h2>Quản lý Bài Viết</h2>";
  postListHTML += "<div class='table-responsive'><table class='uk-table uk-table-hover uk-table-divider'>";
  postListHTML += "<thead><tr><th>ID</th><th>Tiêu đề</th><th>Ngày tạo</th><th>Mô tả</th><th>Sự kiện/Bài viết</th><th>Trạng thái</th><th>Số lượt thích</th><th>Số lượt tham gia</th><th>Địa điểm sự kiện</th><th>Ngày bắt đầu</th><th>Ngày kết thúc</th><th>ID Thành viên</th><th>Thao tác</th></tr></thead><tbody>";

  for (var i = 0; i < posts.length; i++) {
    var post = posts[i];
    var event = post.postIsEvent ? "Sự kiện" : "Bài viết";

    postListHTML += "<tr>";
    postListHTML += "<td>" + post.postId + "</td>";
    postListHTML += "<td>" + post.postTitle + "</td>";
    postListHTML += "<td>" + formatDate(post.postCreateAt) + "</td>";
    postListHTML += "<td>" + post.postDescription + "</td>";
    postListHTML += "<td>" + event + "</td>";
    postListHTML += "<td>" + post.postStatus + "</td>";
    postListHTML += "<td>" + post.postNumberLike + "</td>";
    postListHTML += "<td>" + post.postNumberJoin + "</td>";
    postListHTML += "<td>" + post.eventLocation + "</td>";
    postListHTML += "<td>" + formatDate(post.eventStartDate) + "</td>";
    postListHTML += "<td>" + formatDate(post.eventEndDate) + "</td>";
    postListHTML += "<td>" + post.member.memberId + "</td>";
    // Add the "Delete" and "Agree" buttons with data attributes for post ID
    postListHTML +=
      "<td><button class='uk-button uk-button-small uk-button-danger delete-post-btn' data-post-id='" +
      post.postId +
      "'>Delete</button>" +
      "<button class='uk-button uk-button-small uk-button-primary moderate-post-btn' data-post-id='" +
      post.postId +
      "'>Agree</button></td>";
    postListHTML += "</tr>";
  }

  postListHTML += "</tbody></table></div>";

  $("#components-nav li:nth-child(4)").html(postListHTML);

  // Add event listeners for the "Delete" and "Agree" buttons
  $(".delete-post-btn").on("click", function () {
    const postId = $(this).data("post-id");
    // Call the deletePost function to delete the post
    deletePost(postId)
      .then(() => {
        $(this).closest("tr").remove();
        // Reload the post list to reflect the changes after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting post: ", error);
        // Handle error if needed
      });
  });

  $(".moderate-post-btn").on("click", function () {
    const postId = $(this).data("post-id");
    // Call the moderatePost function to moderate the post
    moderatePost(postId)
      .then(() => {
        // Handle the success response after moderating the post (if needed)
      })
      .catch((error) => {
        console.error("Error moderating post: ", error);
        // Handle error if needed
      });
  });
}

function displayEventList(eventPosts) {
  var eventListHTML = "<h2>Quản lý sự kiện</h2>";
  eventListHTML += "<div class='table-responsive'><table class='uk-table uk-table-hover uk-table-divider'>";
  eventListHTML += "<thead><tr><th>ID</th><th>Tiêu đề</th><th>Ngày tạo</th><th>Mô tả</th><th>Trạng thái</th><th>Số lượt thích</th><th>Số lượt tham gia</th><th>Địa điểm sự kiện</th><th>Ngày bắt đầu</th><th>Ngày kết thúc</th><th>ID Thành viên</th><th>Thao tác</th></tr></thead><tbody>";

  for (var i = 0; i < eventPosts.length; i++) {
    var post = eventPosts[i];

    eventListHTML += "<tr>";
    eventListHTML += "<td>" + post.postId + "</td>";
    eventListHTML += "<td>" + post.postTitle + "</td>";
    eventListHTML += "<td>" + formatDate(post.postCreateAt) + "</td>";
    eventListHTML += "<td>" + post.postDescription + "</td>";
    eventListHTML += "<td>" + post.postStatus + "</td>";
    eventListHTML += "<td>" + post.postNumberLike + "</td>";
    eventListHTML += "<td>" + post.postNumberJoin + "</td>";
    eventListHTML += "<td>" + post.eventLocation + "</td>";
    eventListHTML += "<td>" + formatDate(post.eventStartDate) + "</td>";
    eventListHTML += "<td>" + formatDate(post.eventEndDate) + "</td>";
    eventListHTML += "<td>" + post.member.memberId + "</td>";
    // Add the "Delete" and "Agree" buttons with data attributes for post ID
    eventListHTML +=
      "<td><button class='uk-button uk-button-small uk-button-danger delete-post-btn' data-post-id='" +
      post.postId +
      "'>Delete</button>" +
      "<button class='uk-button uk-button-small uk-button-primary moderate-post-btn' data-post-id='" +
      post.postId +
      "'>Agree</button></td>";
    eventListHTML += "</tr>";
  }

  eventListHTML += "</tbody></table></div>";

  $("#components-nav li:nth-child(5)").html(eventListHTML);

  // Add event listeners for the "Delete" and "Agree" buttons
  $(".delete-post-btn").on("click", function () {
    const postId = $(this).data("post-id");
    // Call the deletePost function to delete the post
    deletePost(postId)
      .then(() => {
        $(this).closest("tr").remove();
        // Reload the event post list to reflect the changes after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting post: ", error);
        // Handle error if needed
      });
  });

  $(".moderate-post-btn").on("click", function () {
    const postId = $(this).data("post-id");
    // Call the moderatePost function to moderate the post
    moderatePost(postId)
      .then(() => {
        // Handle the success response after moderating the post (if needed)
      })
      .catch((error) => {
        console.error("Error moderating post: ", error);
        // Handle error if needed
      });
  });
}

function formatDate(dateString) {
  var date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
