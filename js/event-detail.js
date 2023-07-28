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

$(document).ready(function () {
// Lấy post id từ URL (lấy giá trị của tham số postId trong URL)
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");

// Kiểm tra nếu postId không tồn tại trong URL hoặc giá trị postId không hợp lệ
if (!postId || postId.trim() === "") {
  console.log("Không tìm thấy postId trong URL hoặc postId không hợp lệ.");
  return;
}

// Gọi API để lấy thông tin chi tiết của event dựa vào postId
$.ajax({
  url: "https://localhost:7206/api/Post/get-post-id?id=" + postId,
  method: "GET",
  success: function (response) {
    if (response && response.data) {
      // Hiển thị thông tin chi tiết của event lên trang event-detail.html
      displayEventData(response.data);
    } else {
      console.log("Không có dữ liệu hoặc dữ liệu không hợp lệ từ API.");
    }
  },
  error: function () {
    console.log("Lỗi khi gọi API.");
  },
});
});

function displayEventData(eventData) {
// Hiển thị thông tin của event lên trang event-detail.html
var eventTitle = eventData.postTitle;
var eventDescription = eventData.postDescription;
var eventLocation = eventData.eventLocation;
var eventStartDate = eventData.eventStartDate;
var eventEndDate = eventData.eventEndDate;
var eventImage = eventData.media && eventData.media.length > 0 ? eventData.media[0].linkMedia : "";

// Format ngày giờ bắt đầu và kết thúc sự kiện
var formattedStartDate = new Date(eventStartDate).toLocaleString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZoneName: "short",
  hour12: true,
});

var formattedEndDate = new Date(eventEndDate).toLocaleString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZoneName: "short",
  hour12: true,
});

// Hiển thị thông tin của event lên trang event-detail.html
$(".main-title").text(eventTitle);
$(".event-desc p").text(eventDescription);
$(".event-loc p").text(eventLocation);
$(".event-schedule p").html(`Start: ${formattedStartDate}<br>End: ${formattedEndDate}`);

// Set ảnh của event
$(".event-detail-img img").attr("src", eventImage);

// Hiển thị số lượng người đã tham gia sự kiện
$(".event-loc strong").text(eventData.postNumberJoin + " people have joined this event.");
}

$(document).ready(function () {
  // Lấy post id từ URL (lấy giá trị của tham số postId trong URL)
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("postId");

  // Kiểm tra nếu postId không tồn tại trong URL hoặc giá trị postId không hợp lệ
  if (!postId || postId.trim() === "") {
    console.log("Không tìm thấy postId trong URL hoặc postId không hợp lệ.");
    return;
  }

  // Gọi API để lấy thông tin chi tiết của event dựa vào postId
  $.ajax({
    url: "https://localhost:7206/api/Post/get-post-id?id=" + postId,
    method: "GET",
    success: function (response) {
      if (response && response.data) {
        // Hiển thị thông tin chi tiết của event lên trang event-detail.html
        displayEventData(response.data);
        // Check if the user is already joined the event
        var isJoined = response.data.isJoined;
        // Add event listener for the Join/Unjoin button
        $("#joinButton").on("click", function () {
          // Call the joinEvent or unjoinEvent function based on the event status
          var memberId = "Mem7ca5a87"; // Replace this with the actual member ID
          if (isJoined) {
            unjoinEvent(memberId, postId, function () {
              // Callback function after successful unjoin
              isJoined = false;
              $("#joinButton").text("Join Event");
            });
          } else {
            joinEvent(memberId, postId, function () {
              // Callback function after successful join
              isJoined = true;
              $("#joinButton").text("Unjoin Event");
            });
          }
        });
      } else {
        console.log("Không có dữ liệu hoặc dữ liệu không hợp lệ từ API.");
      }
    },
    error: function () {
      console.log("Lỗi khi gọi API.");
    },
  });
});

// Function to join an event
function joinEvent(memberId, postId, successCallback) {
  $.ajax({
    url: "https://localhost:7206/api/JoinEvent/Join",
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json-patch+json",
    },
    data: JSON.stringify({
      memberId: memberId,
      postId: postId,
      isFollow: true,
      status: true,
    }),
    success: function (response) {
      // Handle success, for example, show a success message or update UI
      console.log("Successfully joined the event.");
      if (successCallback) {
        successCallback();
      }
    },
    error: function () {
      // Handle error, for example, show an error message or handle the failure
      console.log("Failed to join the event.");
    },
  });
}

// Function to unjoin an event
function unjoinEvent(memberId, postId, successCallback) {
  $.ajax({
    url: "https://localhost:7206/api/JoinEvent/UnJoin",
    method: "PUT",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json-patch+json",
    },
    data: JSON.stringify({
      memberId: memberId,
      postId: postId,
      isFollow: true,
      status: true,
    }),
    success: function (response) {
      // Handle success, for example, show a success message or update UI
      console.log("Successfully unjoined the event.");
      if (successCallback) {
        successCallback();
      }
    },
    error: function () {
      // Handle error, for example, show an error message or handle the failure
      console.log("Failed to unjoin the event.");
    },
  });
}

// Function to check if the user has already joined the event
function checkJoinStatus() {
  const postId = getPostIdFromURL();
  const memberId = "Mem7ca5a87"; // Replace this with the actual member ID
  const isJoined = sessionStorage.getItem(`joinStatus_${memberId}_${postId}`) === "true";
  return isJoined;
}

// Function to set the join status in localStorage
function setJoinStatus(isJoined) {
  const postId = getPostIdFromURL();
  const memberId = "Mem7ca5a87"; // Replace this with the actual member ID
  sessionStorage.setItem(`joinStatus_${memberId}_${postId}`, isJoined ? "true" : "false");
}

// Function to handle the Join/Unjoin button click
function handleJoinButtonClick() {
  var isJoined = checkJoinStatus();
  var memberId = "Mem7ca5a87"; // Replace this with the actual member ID
  const postId = getPostIdFromURL();

  if (isJoined) {
    unjoinEvent(memberId, postId, function () {
      isJoined = false;
      $("#joinButton").text("Join Event");
      setJoinStatus(isJoined); // Save the join status in sessionStorage
    });
  } else {
    joinEvent(memberId, postId, function () {
      isJoined = true;
      $("#joinButton").text("Unjoin Event");
      setJoinStatus(isJoined); // Save the join status in sessionStorage
    });
  }
}

// Function to get the "postId" from the URL
function getPostIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("postId");
}

// Add event listener for the Join/Unjoin button
$(document).ready(function () {
  const isJoined = checkJoinStatus();
  $("#joinButton").text(isJoined ? "Unjoin Event" : "Join Event");
  $("#joinButton").on("click", handleJoinButtonClick);
});

// Rest of the existing code...
