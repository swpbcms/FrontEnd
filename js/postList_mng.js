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
  postListHTML += "<colgroup>"; // Add a colgroup to define column widths
  postListHTML += "<col style='width: 5%'>"; // ID column (5% width)
  postListHTML += "<col style='width: 20%'>"; // Tiêu đề column (20% width)
  postListHTML += "<col style='width: 15%'>"; // Ngày tạo column (15% width)
  postListHTML += "<col style='width: 25%'>"; // Mô tả column (25% width)
  postListHTML += "<thead><tr><th>ID</th><th>Tiêu đề</th><th>Ngày tạo</th><th>Mô tả</th><th>Trạng thái</th><th>Số lượt thích</th><th>Số lượt tham gia</th><th>Địa điểm sự kiện</th><th>Ngày bắt đầu</th><th>Ngày kết thúc</th><th>ID Thành viên</th><th>Thao tác</th></tr></thead><tbody>";

  for (var i = 0; i < posts.length; i++) {
    var post = posts[i];
    var event = post.postIsEvent ? "Sự kiện" : "Bài viết";
  
    if (post.postIsEvent === false) {
      postListHTML += "<tr>";
      postListHTML += "<td>" + post.postId + "</td>";
      postListHTML += "<td class='wrap-text'>" + post.postTitle + "</td>";
      postListHTML += "<td>" + formatDate(post.postCreateAt) + "</td>";
      postListHTML += "<td class='wrap-text'>" + post.postDescription + "</td>";
      postListHTML += "<td>" + post.postStatus + "</td>";
      postListHTML += "<td>" + post.postNumberLike + "</td>";
      postListHTML += "<td>" + post.postNumberJoin + "</td>";
      postListHTML += "<td>" + post.eventLocation + "</td>";
      postListHTML += "<td>" + formatDate(post.eventStartDate) + "</td>";
      postListHTML += "<td>" + formatDate(post.eventEndDate) + "</td>";
      postListHTML += "<td>" + post.member.memberId + "</td>";
      postListHTML += "<td><button class='uk-button uk-button-small uk-button-success restore-post-btn' data-post-id='" + post.postId + "'>Restore</button>";
      postListHTML += "<button class='uk-button uk-button-small uk-button-primary agree-post-btn' data-post-id='" + post.postId + "'>Agree</button>";
      postListHTML += "<button class='uk-button uk-button-small uk-button-danger delete-post-btn' data-post-id='" + post.postId + "'>Delete</button></td>";
      postListHTML += "</tr>";
    }
  }
  
  $("#components-nav li:nth-child(3)").html(postListHTML);

// Add the "Restore Post" button event listener here
$(".restore-post-btn").on("click", function () {
  const postId = $(this).data("post-id");
  const status = $(this).closest("tr").find("td:eq(5)").text().trim(); // Get the status from the table cell

  // Check if the status is "Thành công"
  if (status === "Thành công") {
    Swal.fire({
      title: 'Warning',
      text: "Post already exists.",
      icon: 'warning',
      confirmButtonText: 'OK',
    });
    return;
  }

  // Show a confirmation dialog before proceeding with the restoration
  Swal.fire({
    title: 'Are you sure?',
    text: "You want to restore this post?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Restore',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      // Show a loading modal while waiting for the API response
      Swal.showLoading();

      // Call the reStatusPost function to restore the post
      reStatusPost(postId)
        .then(() => {
          // Reload the post list to reflect the changes after successful restoration
          loadPostList();
          Swal.fire({
            title: 'Success',
            text: 'Post restored successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        })
        .catch((error) => {
          console.error("Error restoring post: ", error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to restore post. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        });
    }
  });
});


$(".agree-post-btn").on("click", function () {
  const postId = $(this).data("post-id");
  const status = $(this).closest("tr").find("td:eq(5)").text().trim(); // Get the status from the table cell

  // Check if the status is "hủy" or "Thành công"
  if (status === "hủy" || status === "Thành công") {
    Swal.fire({
      title: 'Warning',
      text: "Post already moderated.",
      icon: 'warning',
      confirmButtonText: 'OK',
    });
    return;
  }

  // Get the manager's ID from the session storage
  var loggedInManager = sessionStorage.getItem("loggedInManager");
  if (!loggedInManager) {
    console.error("Manager not logged in.");
    return;
  }

  var managerId = JSON.parse(loggedInManager).managerId;

  // Show a confirmation dialog before proceeding with the agreement
  Swal.fire({
    title: 'Are you sure?',
    text: "You want to agree to this post?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Agree',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      // Call the moderatePost function to agree to the post
      moderatePost(postId, true, managerId)
        .then(() => {
          // Remove the post row from the table after successful agreement
          $(this).closest("tr").remove();
          loadPostList();
        })
        .catch((error) => {
          console.error("Error moderating post: ", error);
        });
    }
  });
});
  // Add the "Delete Post" button event listener here
  $(".delete-post-btn").on("click", function () {
    const postId = $(this).data("post-id");
    const status = $(this).closest("tr").find("td:eq(5)").text().trim(); // Get the status from the table cell
  
    // Check if the status is "hủy"
       if (status === "hủy") {
      Swal.fire({
        title: 'Warning',
        text: "Post already deleted.",
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Show a confirmation dialog before proceeding with the deletion
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this post?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the deletePost function to delete the post
        deletePost(postId)
          .then(() => {
            // Remove the post row from the table after successful deletion
            $(this).closest("tr").remove();
            loadPostList();
          })
          .catch((error) => {
            console.error("Error deleting post: ", error);
          });
      }
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
  eventListHTML += "<colgroup>"; // Add a colgroup to define column widths
  eventListHTML += "<col style='width: 5%'>"; // ID column (5% width)
  eventListHTML += "<col style='width: 20%'>"; // Tiêu đề column (20% width)
  eventListHTML += "<col style='width: 15%'>"; // Ngày tạo column (15% width)
  eventListHTML += "<col style='width: 25%'>"; // Mô tả column (25% width)
  eventListHTML += "<thead><tr><th>ID</th><th>Tiêu đề</th><th>Ngày tạo</th><th>Mô tả</th><th>Trạng thái</th><th>Số lượt thích</th><th>Số lượt tham gia</th><th>Địa điểm sự kiện</th><th>Ngày bắt đầu</th><th>Ngày kết thúc</th><th>ID Thành viên</th><th>Thao tác</th></tr></thead><tbody>";

  for (var i = 0; i < eventPosts.length; i++) {
    var post = eventPosts[i];

    // Only display the event row if "Sự kiện/Bài viết" is "Sự kiện"
    if (post.postIsEvent === true) {
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
      eventListHTML += "<td><button class='uk-button uk-button-small uk-button-primary agree-event-btn' data-post-id='" + post.postId + "'>Agree</button>";
      eventListHTML += "<button class='uk-button uk-button-small uk-button-danger delete-event-btn' data-post-id='" + post.postId + "'>Delete</button></td>";
      eventListHTML += "</tr>";
    }
  }

  eventListHTML += "</tbody></table></div>";

  $("#components-nav li:nth-child(4)").html(eventListHTML);
  // Add the "Restore Event" button event listener here
$(".restore-event-btn").on("click", function () {
  const postId = $(this).data("post-id");
  const status = $(this).closest("tr").find("td:eq(4)").text().trim(); // Get the status from the table cell

  // Check if the status is "Thành công"
  if (status === "Thành công") {
    Swal.fire({
      title: 'Warning',
      text: "Event already exists.",
      icon: 'warning',
      confirmButtonText: 'OK',
    });
    return;
  }

  // Show a confirmation dialog before proceeding with the restoration
  Swal.fire({
    title: 'Are you sure?',
    text: "You want to restore this event?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Restore',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      // Show a loading modal while waiting for the API response
      Swal.showLoading();

      // Call the reStatusPost function to restore the event
      reStatusPost(postId)
        .then(() => {
          // Reload the event list to reflect the changes after successful restoration
          loadEventPostList();
          Swal.fire({
            title: 'Success',
            text: 'Event restored successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        })
        .catch((error) => {
          console.error("Error restoring event: ", error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to restore event. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        });
    }
  });
});

$(".agree-event-btn").on("click", function () {
  const postId = $(this).data("post-id");
  const status = $(this).closest("tr").find("td:eq(4)").text().trim(); // Get the status from the table cell

  // Check if the status is "hủy" or "Thành công"
  if (status === "hủy" || status === "Thành công") {
    Swal.fire({
      title: 'Warning',
      text: "Event already moderated.",
      icon: 'warning',
      confirmButtonText: 'OK',
    });
    return;
  }

  // Get the manager's ID from the session storage
  var loggedInManager = sessionStorage.getItem("loggedInManager");
  if (!loggedInManager) {
    console.error("Manager not logged in.");
    return;
  }

  var managerId = JSON.parse(loggedInManager).managerId;

  // Show a confirmation dialog before proceeding with the agreement
  Swal.fire({
    title: 'Are you sure?',
    text: "You want to agree to this event?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Agree',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      // Call the moderatePost function to agree to the event
      moderatePost(postId, true, managerId)
        .then(() => {
          // Remove the event row from the table after successful agreement
          $(this).closest("tr").remove();
          loadEventPostList();
        })
        .catch((error) => {
          console.error("Error moderating event: ", error);
        });
    }
  });
});
// Add the "Delete Event" button event listener here
$(".delete-event-btn").on("click", function () {
  const postId = $(this).data("post-id");
  const status = $(this).closest("tr").find("td:eq(4)").text().trim(); // Get the status from the table cell

  // Check if the status is "hủy"
  if (status === "hủy") {
    Swal.fire({
      title: 'Warning',
      text: "Event already deleted.",
      icon: 'warning',
      confirmButtonText: 'OK',
    });
    return;
  }

  // Show a confirmation dialog before proceeding with the deletion
  Swal.fire({
    title: 'Are you sure?',
    text: "You want to delete this event?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      // Call the deletePost function to delete the event
      deletePost(postId)
        .then(() => {
          // Remove the event row from the table after successful deletion
          $(this).closest("tr").remove();
          loadEventPostList();
        })
        .catch((error) => {
          console.error("Error deleting event: ", error);
        });
    }
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
  
  