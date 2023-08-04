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
    if (post.media && post.media.length > 0) {
      var eventTitle = post.postTitle;
      var eventImage = post.media[0].linkMedia;
      var eventLocation = post.eventLocation;
      var eventStartDate = new Date(post.eventStartDate);
      var eventEndDate = new Date(post.eventEndDate);
      var postId = post.postId;
      var postNumberJoin = post.postNumberJoin;

      var eventStatus = '';
      var now = new Date();
      
      var eventStatusClass = '';
      if (now < eventStartDate) {
        eventStatus = "Sắp diễn ra";
        eventStatusClass = "upcoming";
      } else if (now > eventEndDate) {
        eventStatus = "Đã diễn ra";
        eventStatusClass = "past";
      } else {
        eventStatus = "Đang diễn ra";
        eventStatusClass = "ongoing";
      }
      
      
      // Generate the HTML for the current event post
      if (post.postIsEvent === true && post.postStatus === "Thành công") {
          const eventHTML = `<div class="col-lg-4 col-md-4 col-sm-6">
      <div class="event-post mb-3">
        <figure>
          <a title=""><img src="${eventImage}" alt="${eventTitle}" class="eventImage"></a>
        </figure>
        <div class="event-meta">
        <span class="eventStatus ${eventStatusClass}">${eventStatus}</span>
          <span class="eventStatus">Number join event: ${postNumberJoin}</span> 
          <span class="post-id" style="display: none;">${postId}</span>
          <h6><a href="event-detail.html" title="" class="eventTitle">${eventTitle}</a></h6>
          <p class="eventDescription">Start: ${eventStartDate}</p>
          <p class="eventDescription">End: ${eventEndDate}</p>
          <p class="eventLocation">Location: ${eventLocation}</p>
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

    eventPost += eventHTML; 

  }
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


$('#searchInput').on('keydown', function (event) {
  if (event.which === 13) { // Kiểm tra nếu phím Enter được nhấn
    event.preventDefault(); // Ngăn chặn hành động mặc định của phím Enter (chuyển trang)

    var searchQuery = $(this).val(); // Lấy giá trị tìm kiếm từ ô input

    if (searchQuery.trim() !== '') { // Kiểm tra nếu ô tìm kiếm không trống
      searchAndNavigate(searchQuery);
    }
  }
});

function searchAndNavigate(query) {
  // Thực hiện xử lý tìm kiếm và chuyển trang tại đây
  // Dựa vào giá trị 'query' để thực hiện tìm kiếm và chuyển trang đến trang kết quả tìm kiếm
  var url = 'https://localhost:7206/api/Post/search-postuser?search=' + encodeURIComponent(query);
  var variable = query;
  localStorage.setItem('myVariable', url);
  localStorage.setItem('query', variable);
  window.location.href = 'search-result.html?search=' + query;
}

$(document).on("click", ".eventImage", function () {
  // Extract postId from the closest ancestor element with the class "event-post"
  var postId = $(this).closest(".event-post").find(".post-id").text();

  // Save postId to sessionStorage
  sessionStorage.setItem('selectedPostId', postId);

  // Redirect to event-detail.html
  redirectToEventDetail(postId);
});


// Function to redirect to event-detail.html with the postId
function redirectToEventDetail(postId) {
  // // Fetch the event details using the postId (optional step, you can directly pass postId as a query parameter)
  // $.ajax({
  //   url: "https://localhost:7206/api/Post/get-post-id?id=" + postId,
  //   method: "GET",
  //   success: function (response) {
  //     if (response && response.data) {
  //       // Redirect to the event-detail.html page, passing the postId as a query parameter
        window.location.href = "event-detail.html?postId=" + postId;
    //   } else {
    //     console.log("Không có dữ liệu hoặc dữ liệu không hợp lệ từ API.");
    //   }
    // },
    // error: function () {
    //   console.log("Lỗi khi gọi API.");
    // },
  // });
}
