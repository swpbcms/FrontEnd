// postList_mng.js

import { getPosts, updatePost, deletePost } from "./services/post.service.js";

// const displayPostList = async () => {
//   try {
//     const timestamp = Date.now(); // Get the current timestamp
//     const response = await getPosts({ timestamp }); // Pass the timestamp as a parameter to the getPosts function
//     console.log("Response Data:", response.data);
//     const posts = response.data;

//     const postListContainer = document.getElementById("post-list-container");
//     postListContainer.innerHTML = "";

//     if (posts && posts.length > 0) {
//       const table = createPostTable(posts);
//       postListContainer.appendChild(table);
//     } else {
//       postListContainer.innerHTML = "<p>No posts found.</p>";
//     }
//   } catch (error) {
//     console.error("Error fetching posts:", error.message);
//   }
// };

// const createPostTable = (posts) => {
//   const table = document.createElement("table");
//   table.classList.add("post-list-table");

//   const tableHeader = createTableHeader();
//   table.appendChild(tableHeader);

//   const tableBody = document.createElement("tbody");
//   posts.forEach((post) => {
//     const postRow = createPostRow(post);
//     tableBody.appendChild(postRow);
//   });

//   table.appendChild(tableBody);

//   // Add a container div with a scrollable style
//   const tableContainer = document.createElement("div");
//   tableContainer.classList.add("table-container");
//   tableContainer.appendChild(table);

//   return tableContainer;
// };

// const createTableHeader = () => {
//   const tableHeader = document.createElement("thead");
//   const headerRow = document.createElement("tr");

//   const IdHeader = document.createElement("th");
//   IdHeader.textContent = "ID";
//   headerRow.appendChild(IdHeader);

//   const createdAtHeader = document.createElement("th");
//   createdAtHeader.textContent = "Created At";
//   headerRow.appendChild(createdAtHeader);

//   const postTitleHeader = document.createElement("th");
//   postTitleHeader.textContent = "Title";
//   headerRow.appendChild(postTitleHeader);

//   const descriptionHeader = document.createElement("th");
//   descriptionHeader.textContent = "Description";
//   headerRow.appendChild(descriptionHeader);

//   const isEventHeader = document.createElement("th");
//   isEventHeader.textContent = "Is Event";
//   headerRow.appendChild(isEventHeader);

//   const statusHeader = document.createElement("th");
//   statusHeader.textContent = "Status";
//   headerRow.appendChild(statusHeader);

//   const numberLikeHeader = document.createElement("th");
//   numberLikeHeader.textContent = "Number of Likes";
//   headerRow.appendChild(numberLikeHeader);

//   const numberJoinHeader = document.createElement("th");
//   numberJoinHeader.textContent = "Number of Joins";
//   headerRow.appendChild(numberJoinHeader);

//   const locationHeader = document.createElement("th");
//   locationHeader.textContent = "Event Location";
//   headerRow.appendChild(locationHeader);

//   const startDateHeader = document.createElement("th");
//   startDateHeader.textContent = "Event Start Date";
//   headerRow.appendChild(startDateHeader);

//   const endDateHeader = document.createElement("th");
//   endDateHeader.textContent = "Event End Date";
//   headerRow.appendChild(endDateHeader);

//   const memberIdHeader = document.createElement("th");
//   memberIdHeader.textContent = "Member ID";
//   headerRow.appendChild(memberIdHeader);

//   const managerIdHeader = document.createElement("th");
//   managerIdHeader.textContent = "Manager ID";
//   headerRow.appendChild(managerIdHeader);

//   const actionHeader = document.createElement("th");
//   actionHeader.textContent = "Actions";
//   headerRow.appendChild(actionHeader);

//   tableHeader.appendChild(headerRow);
//   return tableHeader;
// };


// const createPostRow = (post) => { 


//   const postRow = document.createElement("tr");

//   const postIdCell = document.createElement("td");
//   postIdCell.textContent = post.postId;
//   postRow.appendChild(postIdCell);

//   const createdAtCell = document.createElement("td");
//   const createdAt = new Date(post.postCreateAt).toLocaleDateString();
//   createdAtCell.textContent = post.postCreateAt;
//   postRow.appendChild(createdAtCell);

//   const postTitleCell = document.createElement("td");
//   postTitleCell.textContent = post.postTitle;
//   postRow.appendChild(postTitleCell);

//   const descriptionCell = document.createElement("td");
//   descriptionCell.textContent = post.postDescription;
//   postRow.appendChild(descriptionCell);

//   const isEventCell = document.createElement("td");
//   isEventCell.textContent = post.postIsEvent ? "Yes" : "No";
//   postRow.appendChild(isEventCell);

//   const statusCell = document.createElement("td");
//   statusCell.textContent = post.postStatus;
//   postRow.appendChild(statusCell);

//   const numberLikeCell = document.createElement("td");
//   numberLikeCell.textContent = post.postNumberLike;
//   postRow.appendChild(numberLikeCell);

//   const numberJoinCell = document.createElement("td");
//   numberJoinCell.textContent = post.postNumberJoin;
//   postRow.appendChild(numberJoinCell);

//   const locationCell = document.createElement("td");
//   locationCell.textContent = post.eventLocation || "-";
//   postRow.appendChild(locationCell);

//   const startDateCell = document.createElement("td");
//   startDateCell.textContent = post.eventStartDate || "-";
//   postRow.appendChild(startDateCell);

//   const endDateCell = document.createElement("td");
//   endDateCell.textContent = post.eventEndDate || "-";
//   postRow.appendChild(endDateCell);

//   const memberIdCell = document.createElement("td");
//   memberIdCell.textContent = post.memberId;
//   postRow.appendChild(memberIdCell);

//   const managerIdCell = document.createElement("td");
//   managerIdCell.textContent = post.managerId || "-";
//   postRow.appendChild(managerIdCell);

//   const actionCell = document.createElement("td");

//   const updateButton = document.createElement("button");
//   updateButton.textContent = "Update";
//   updateButton.addEventListener("click", () => handleUpdatePost(post));
//   actionCell.appendChild(updateButton);

//   const deleteButton = document.createElement("button");
//   deleteButton.textContent = "Delete";
//   deleteButton.addEventListener("click", () => handleDeletePost(post.postId)); // Pass 'post.postId' here
//   actionCell.appendChild(deleteButton);

//   postRow.appendChild(actionCell);

//   return postRow;
// };

// const handleUpdatePost = async (post) => {
//   console.log("Update Post:", post.postId);
// };

// // ...

// const handleDeletePost = async (postId) => {
//   try {
//     // Call the deletePost function with the postId
//     await deletePost(postId);
//     console.log(`Post with ID ${postId} has been deleted successfully.`);
//     // You may choose to refresh the post list after successful deletion
//     // displayPostList();
//   } catch (error) {
//     console.error("Error deleting post:", error.message);
//   }
// };


// // const displayUpdatedPostList = (updatedPosts) => {
// //   const postListContainer = document.getElementById("post-list-container");
// //   postListContainer.innerHTML = "";

// //   if (updatedPosts && updatedPosts.length > 0) {
// //     const table = createPostTable(updatedPosts);
// //     postListContainer.appendChild(table);
// //   } else {
// //     postListContainer.innerHTML = "<p>No posts found.</p>";
// //   }
// // };



// displayPostList();






$(document).ready(function() {
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
    $.ajax({
      url: 'https://localhost:7206/api/Post/get-post',
      type: 'GET',
      dataType: 'json',
      success: function(response) {
        // Handle API response
        if (response && response.data) {
          // Process the post list data and display it on the page
          var posts = response.data;
  
          // Display post list
          displayPostList(posts);
        } else {
          console.log('Failed to fetch post list');
        }
      },
      error: function(error) {
        console.log('An error occurred while fetching post list: ' + error);
      }
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
      // Add the Update and Delete Post buttons with the data attribute for post ID
      postListHTML += "<td><button class='uk-button uk-button-small uk-button-primary update-post-btn' data-post-id='" + post.postId + "'>Update</button>";
      postListHTML += "<button class='uk-button uk-button-small uk-button-danger delete-post-btn' data-post-id='" + post.postId + "'>Delete</button></td>";
      postListHTML += "</tr>";
    }
  
    postListHTML += "</tbody></table></div>";
  
    $("#components-nav li:nth-child(3)").html(postListHTML);
  
    $(".update-post-btn").on("click", function () {
      const postId = $(this).data("post-id");
      const post = posts.find((post) => post.postId === postId);
  
      updatePost(
        postId,
        post.postTitle,
        post.postDescription,
        post.eventLocation,
        post.eventStartDate,
        post.eventEndDate,
        post.member.memberId,
        post.categories,
        post.media
      )
        .then(() => {
          // Reload the post list to reflect the changes after successful update
          loadPostList();
        })
        .catch((error) => {
          console.error("Error updating post: ", error);
          // Handle error if needed
        });
    });
  
    // Add the "Delete Post" button event listener here
    $(".delete-post-btn").on("click", function () {
       // Show confirmation dialog
      var confirmDelete = window.confirm("Bạn có chắc chắn xoá bài viết này?");
      if (confirmDelete) {
      const postId = $(this).data("post-id");
      // Call the deletePost function to delete the post
      deletePost(postId)
        .then(() => {
          // Reload the post list to reflect the changes after successful deletion
          loadPostList();
        })
        .catch((error) => {
          console.error("Error deleting post: ", error);
          // Handle error if needed
        });
      }
    });
  }
  

  function displayEventList(eventPosts) {
    var eventListHTML = "<h2>Quản lý sự kiện</h2>";
    eventListHTML += "<div class='table-responsive'><table class='uk-table uk-table-hover uk-table-divider'>";
    eventListHTML += "<thead><tr><th>ID</th><th>Tiêu đề</th><th>Ngày tạo</th><th>Mô tả</th><th>Trạng thái</th><th>Số lượt thích</th><th>Số lượt tham gia</th><th>Địa điểm sự kiện</th><th>Ngày bắt đầu</th><th>Ngày kết thúc</th><th>ID Thành viên</th></tr></thead><tbody>";
  
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
      eventListHTML += "</tr>";
    }
  
    eventListHTML += "</tbody></table></div>";
  
    $("#components-nav li:nth-child(4)").html(eventListHTML);
  }
  
  
  
  function formatDate(dateString) {
    var date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
  
  