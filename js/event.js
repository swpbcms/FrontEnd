import { join, unjoin} from "./services/join-event.service.js";

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
    $("#logoutButton").click(function () {
        // Clear the session storage
        sessionStorage.removeItem("loggedInMember");
        // Redirect to the login page or perform any other desired action
        window.location.href = "feed.html";
    });
});

$.ajax({
    url: "https://localhost:7206/api/Post/get-post",
    method: "GET",
    success: function (response) {
        // Kiểm tra dữ liệu trả về từ API
        if (response && response.data) {
            // Filter postId's with postIsEvent true
            var eventPostIds = response.data
                .filter(function (post) {
                    return post.postIsEvent === true;
                })
                .map(function (post) {
                    return post.postId;
                });

            // Lưu mảng postIds vào local storage
            localStorage.setItem("eventPostIds", JSON.stringify(eventPostIds));

            // Hiển thị dữ liệu
            displayData(response.data);
        } else {
            console.log("Không có dữ liệu hoặc dữ liệu không hợp lệ từ API.");
        }
    },
    error: function () {
        console.log("Lỗi khi gọi API.");
    },
});


function displayData(data) {
    let eventPost = ''; // Initialize the variable to store the generated HTML

    // Use $.each() to iterate through the data
    $.each(data, (index, post) => {
        var eventTitle = post.postTitle;
        var eventImage = post.media[0].linkMedia;
        var eventStatus = post.postIsEvent ? "Event" : "Post"; // Display "Event" if postStatus is true
        var eventLocation = post.eventLocation;
        var eventStartDate = post.eventStartDate;
        var eventEndDate = post.eventEndDate;
        var postId = post.postId;
        var postNumberJoin = post.postNumberJoin;
        // Generate the HTML for the current event post
        if (post.postIsEvent === true) {
            const eventHTML = `<div class="col-lg-4 col-md-4 col-sm-6">
        <div class="event-post mb-3">
          <figure>
            <a href="event-detail.html" title=""><img src="${eventImage}" alt="${eventTitle}" class="eventImage"></a>
          </figure>
          <div class="event-meta">
            <span class="eventStatus">${eventStatus}</span> 
            <span class="eventStatus">Number join event: ${postNumberJoin}</span> 
            <span class="post-id" style="display: none;">${postId}</span>
            <h6><a href="event-detail.html" title="" class="eventTitle">${eventTitle}</a></h6>
            <p class="eventDescription">Start: ${eventStartDate}</p>
            <p class="eventDescription">End: ${eventEndDate}</p>
            <p class="eventLocation">Location: ${eventLocation}</p>
            <button class="join-event-btn" data-post-id="${postId}" href="#" title="">Join Event</button>
            <div class="more">
              <div class="more-post-optns">
                <i class="feather feather-more-horizontal"></i>
                <ul>
                  <li>
                    <i class="icofont-share-alt"></i>Share to Feed
                    <span>Share This Post to Friends</span>
                  </li>
                  <li>
                    <i class="icofont-ui-text-chat"></i>Send Message
                    <span>Send This in messages, groups</span>
                  </li>
                  <li>
                    <i class="icofont-ui-delete"></i>Delete Post
                    <span>If inappropriate Post By Mistake</span>
                  </li>
                  <li>
                    <i class="icofont-flag"></i>Report
                    <span>Inappropriate content</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </div>
      `;

            eventPost += eventHTML; // Append the current event's HTML to the eventPost variable
        }
    });

    // Update the content of the <div> container with the accumulated HTML
    const eventContainer = $("#event-container");
    eventContainer.html(eventPost);
}

// $(document).on("click", ".join-event-btn", function () {
//   // Extract the postId from the data-post-id attribute of the clicked button
//   var postId = $(this).data("post-id");

//   // Redirect to the "Event Detail Page" with the selected postId
//   window.location.href = "event-detail.html?postId=" + postId;
// });

$(document).on("click", ".join-event-btn", function () {
  // Extract memberId from session
  var loggedInMember = sessionStorage.getItem("loggedInMember");
  if (loggedInMember) {
    var mem = JSON.parse(loggedInMember);
    var memberId = mem.memberId;
  } else {
    // Handle the case when the memberId is not available in the session
    console.error("MemberId not found in session.");
    return; // Return early as we cannot proceed without memberId
  }

  // Extract postId from the closest ancestor element with the class "event-post"
  var postId = $(this).closest(".event-post").find(".post-id").text();

  // Check if the post has been joined by the user
  var joinedPosts = JSON.parse(localStorage.getItem("joinedPosts") || "[]");
  var joinedPostIndex = joinedPosts.findIndex(function (joinedPost) {
    return joinedPost.postId === postId && joinedPost.memberId === memberId;
  });
  var isJoined = joinedPostIndex !== -1;

  var promise;
  if (isJoined) {
    // Call unjoin function and update localstorage
    promise = unjoin(memberId, postId)
      .then(() => {
        joinedPosts.splice(joinedPostIndex, 1);
        localStorage.setItem("joinedPosts", JSON.stringify(joinedPosts));
        console.log("Unjoin successful");
      })
      .catch((error) => {
        console.error("Error unjoining event:", error);
      });
  } else {
    // Call join function and update localstorage
    promise = join(memberId, postId)
      .then(() => {
        joinedPosts.push({ postId: postId, memberId: memberId });
        localStorage.setItem("joinedPosts", JSON.stringify(joinedPosts));
        console.log("Join successful");
      })
      .catch((error) => {
        console.error("Error joining event:", error);
      });
  }

  promise.finally(() => location.reload());
});


$("#searchInput").on("keydown", function (event) {
  if (event.which === 13) {
    // Kiểm tra nếu phím Enter được nhấn
    event.preventDefault(); // Ngăn chặn hành động mặc định của phím Enter (chuyển trang)

    var searchQuery = $(this).val(); // Lấy giá trị tìm kiếm từ ô input

    if (searchQuery.trim() !== "") {
      // Kiểm tra nếu ô tìm kiếm không trống
      searchAndNavigate(searchQuery);
    }
  }
});

function searchAndNavigate(query) {
  // Thực hiện xử lý tìm kiếm và chuyển trang tại đây
  // Dựa vào giá trị 'query' để thực hiện tìm kiếm và chuyển trang đến trang kết quả tìm kiếm
  var url =
    "https://localhost:7206/api/Post/search-postuser?search=" +
    encodeURIComponent(query);
  var variable = query;
  localStorage.setItem("myVariable", url);
  localStorage.setItem("query", variable);
  window.location.href = "search-result.html";
}
