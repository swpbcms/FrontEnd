import { getPosts, moderatePost, deletePost, reStatusPost} from "./services/post.service.js";

$(document).ready(function () {
  loadPostList();
  loadEventPostList();
});

  function loadEventPostList() {
    $.ajax({
        url: 'https://localhost:7206/api/Post/get-post',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            // Handle API response
            if (response && response.data) {
                // Filter event posts
                var eventPosts = response.data.filter(function(post) {
                    return post.postIsEvent === true;
                });

                // Display event post list
                displayEventList(eventPosts);
            } else {
                console.log('Failed to fetch post list');
            }
        },
        error: function(error) {
            console.log('An error occurred while fetching post list: ' + error);
        }
    });
}

function loadPostList() {
  getPosts()
    .then((response) => {
      if (response && response.data) {
        // Process the post list data and display it on the page
        var posts = response.data;

        // Display post list
        displayPostList(posts);
      } else {
        $("#components-nav li:nth-child(3)").html("<h2>Quản lý Bài Viết</h2><p>No posts found.</p>");
      }
    })
    .catch((error) => {
      console.log('An error occurred while fetching post list: ' + error);
      $("#components-nav li:nth-child(3)").html("<h2>Quản lý Bài Viết</h2><p>Failed to fetch post list.</p>");
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
    postListHTML += "<td><button class='uk-button uk-button-small uk-button-success restore-post-btn' data-post-id='" + post.postId + "'>Restore</button>";
    postListHTML += "<button class='uk-button uk-button-small uk-button-danger delete-post-btn' data-post-id='" + post.postId + "'>Delete</button></td>";
    postListHTML += "</tr>";
  }

  postListHTML += "</tbody></table></div>";

  $("#components-nav li:nth-child(4)").html(postListHTML);

// Add the "Restore Post" button event listener here
$(".restore-post-btn").on("click", function () {
  const postId = $(this).data("post-id");
  const status = $(this).closest("tr").find("td:eq(5)").text().trim(); // Get the status from the table cell

  if (status === "Thành công") {
    alert("Post already restored.");
    return;
  }

  // Show a confirmation dialog before proceeding with the restoration
  const confirmation = confirm("Are you sure you want to restore this post?");
  if (!confirmation) {
    // If the user cancels the restoration, do nothing
    return;
  }

  // Call the reStatusPost function to restore the post
  reStatusPost(postId)
    .then(() => {
      // Do not remove the post from the list immediately.
      // You can choose to reload the post list to reflect the changes after successful restoration.
      // You can call loadPostList() again here or simply remove the restored row
      loadPostList();
    })
    .catch((error) => {
      console.error("Error restoring post: ", error);
      // Handle error if needed
    });
});

// Add the "Delete Post" button event listener here
$(".delete-post-btn").on("click", function () {
  const postId = $(this).data("post-id");
  const status = $(this).closest("tr").find("td:eq(5)").text().trim(); // Get the status from the table cell

  if (status === "hủy") {
    alert("Post already deleted.");
    return;
  }

  // Show a confirmation dialog before proceeding with the deletion
  const confirmation = confirm("Are you sure you want to delete this post?");
  if (!confirmation) {
    // If the user cancels the deletion, do nothing
    return;
  }

  // Call the deletePost function to delete the post
  deletePost(postId)
    .then(() => {
      $(this).closest("tr").remove();
      // Reload the post list to reflect the changes after successful deletion
      loadPostList();
    })
    .catch((error) => {
      console.error("Error deleting post: ", error);
      // Handle error if needed
    });
});
  
}

function formatDate(dateString) {
  var date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
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
    eventListHTML += "<td><button class='uk-button uk-button-small uk-button-success restore-event-btn' data-post-id='" + post.postId + "'>Restore</button>";
    eventListHTML += "<button class='uk-button uk-button-small uk-button-danger delete-event-btn' data-post-id='" + post.postId + "'>Delete</button></td>";
    eventListHTML += "</tr>";
  }

  eventListHTML += "</tbody></table></div>";

  $("#components-nav li:nth-child(5)").html(eventListHTML);

  $(".restore-event-btn").on("click", function () {
    const postId = $(this).data("post-id");
    const status = $(this).closest("tr").find("td:eq(4)").text().trim(); // Get the status from the table cell

    if (status === "Thành công") {
      alert("Event already restored.");
      return;
    }

    // Show a confirmation dialog before proceeding with the restoration
    const confirmation = confirm("Are you sure you want to restore this event?");
    if (!confirmation) {
      // If the user cancels the restoration, do nothing
      return;
    }

    // Call the reStatusPost function to restore the event
    reStatusPost(postId)
      .then(() => {
        // Do not remove the event from the list immediately.
        // You can choose to reload the event list to reflect the changes after successful restoration.
        // You can call loadEventPostList() again here or simply remove the restored row
        loadEventPostList();
      })
      .catch((error) => {
        console.error("Error restoring event: ", error);
        // Handle error if needed
      });
  });

  // Add the "Delete Event" button event listener here
  $(".delete-event-btn").on("click", function () {
    const postId = $(this).data("post-id");
    const status = $(this).closest("tr").find("td:eq(4)").text().trim(); // Get the status from the table cell

    if (status === "hủy") {
      alert("Event already deleted.");
      return;
    }

    // Show a confirmation dialog before proceeding with the deletion
    const confirmation = confirm("Are you sure you want to delete this event?");
    if (!confirmation) {
      // If the user cancels the deletion, do nothing
      return;
    }

    // Call the deletePost function to delete the event
    deletePost(postId)
      .then(() => {
        $(this).closest("tr").remove();
        // Reload the event list to reflect the changes after successful deletion
        loadEventPostList();
      })
      .catch((error) => {
        console.error("Error deleting event: ", error);
        // Handle error if needed
      });
  });
}

// $(document).ready(function() {
//     loadPostList();
//     loadEventPostList();
//   });

//   function loadEventPostList() {
//     $.ajax({
//         url: 'https://localhost:7206/api/Post/get-post',
//         type: 'GET',
//         dataType: 'json',
//         success: function(response) {
//             // Handle API response
//             if (response && response.data) {
//                 // Filter event posts
//                 var eventPosts = response.data.filter(function(post) {
//                     return post.postIsEvent === true;
//                 });

//                 // Display event post list
//                 displayEventList(eventPosts);
//             } else {
//                 console.log('Failed to fetch post list');
//             }
//         },
//         error: function(error) {
//             console.log('An error occurred while fetching post list: ' + error);
//         }
//     });
// }
  
//   function loadPostList() {
//     $.ajax({
//       url: 'https://localhost:7206/api/Post/get-post',
//       type: 'GET',
//       dataType: 'json',
//       success: function(response) {
//         // Handle API response
//         if (response && response.data) {
//           // Process the post list data and display it on the page
//           var posts = response.data;
  
//           // Display post list
//           displayPostList(posts);
//         } else {
//           console.log('Failed to fetch post list');
//         }
//       },
//       error: function(error) {
//         console.log('An error occurred while fetching post list: ' + error);
//       }
//     });
//   }
  
//   function displayPostList(posts) {
//     var postListHTML = "<h2>Quản lý Bài Viết</h2>";
//     postListHTML += "<div class='table-responsive'><table class='uk-table uk-table-hover uk-table-divider'>";
//     postListHTML += "<thead><tr><th>ID</th><th>Tiêu đề</th><th>Ngày tạo</th><th>Mô tả</th><th>Sự kiện/Bài viết</th><th>Trạng thái</th><th>Số lượt thích</th><th>Số lượt tham gia</th><th>Địa điểm sự kiện</th><th>Ngày bắt đầu</th><th>Ngày kết thúc</th><th>ID Thành viên</th></tr></thead><tbody>";
  
//     for (var i = 0; i < posts.length; i++) {
//       var post = posts[i];
//       var event = post.postIsEvent ? "Sự kiện" : "Bài viết";
  
//       postListHTML += "<tr>";
//       postListHTML += "<td>" + post.postId + "</td>";
//       postListHTML += "<td>" + post.postTitle + "</td>";
//       postListHTML += "<td>" + formatDate(post.postCreateAt) + "</td>";
//       postListHTML += "<td>" + post.postDescription + "</td>";
//       postListHTML += "<td>" + event + "</td>";
//       postListHTML += "<td>" + post.postStatus + "</td>";
//       postListHTML += "<td>" + post.postNumberLike + "</td>";
//       postListHTML += "<td>" + post.postNumberJoin + "</td>";
//       postListHTML += "<td>" + post.eventLocation + "</td>";
//       postListHTML += "<td>" + formatDate(post.eventStartDate) + "</td>";
//       postListHTML += "<td>" + formatDate(post.eventEndDate) + "</td>";
//       postListHTML += "<td>" + post.member.memberId + "</td>";
//       postListHTML += "</tr>";
//     }
  
//     postListHTML += "</tbody></table></div>";
  
//     $("#components-nav li:nth-child(3)").html(postListHTML);
//   }
  

//   function displayEventList(eventPosts) {
//     var eventListHTML = "<h2>Quản lý sự kiện</h2>";
//     eventListHTML += "<div class='table-responsive'><table class='uk-table uk-table-hover uk-table-divider'>";
//     eventListHTML += "<thead><tr><th>ID</th><th>Tiêu đề</th><th>Ngày tạo</th><th>Mô tả</th><th>Trạng thái</th><th>Số lượt thích</th><th>Số lượt tham gia</th><th>Địa điểm sự kiện</th><th>Ngày bắt đầu</th><th>Ngày kết thúc</th><th>ID Thành viên</th></tr></thead><tbody>";
  
//     for (var i = 0; i < eventPosts.length; i++) {
//       var post = eventPosts[i];
  
//       eventListHTML += "<tr>";
//       eventListHTML += "<td>" + post.postId + "</td>";
//       eventListHTML += "<td>" + post.postTitle + "</td>";
//       eventListHTML += "<td>" + formatDate(post.postCreateAt) + "</td>";
//       eventListHTML += "<td>" + post.postDescription + "</td>";
//       eventListHTML += "<td>" + post.postStatus + "</td>";
//       eventListHTML += "<td>" + post.postNumberLike + "</td>";
//       eventListHTML += "<td>" + post.postNumberJoin + "</td>";
//       eventListHTML += "<td>" + post.eventLocation + "</td>";
//       eventListHTML += "<td>" + formatDate(post.eventStartDate) + "</td>";
//       eventListHTML += "<td>" + formatDate(post.eventEndDate) + "</td>";
//       eventListHTML += "<td>" + post.member.memberId + "</td>";
//       eventListHTML += "</tr>";
//     }
  
//     eventListHTML += "</tbody></table></div>";
  
//     $("#components-nav li:nth-child(4)").html(eventListHTML);
//   }
  
  
  
//   function formatDate(dateString) {
//     var date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
//   }
  
  