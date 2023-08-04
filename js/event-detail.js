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
    window.location.href = "sign-in.html";
  });
});


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
        // Display event data...
        displayEventData(response.data);
        var loggedInMember = sessionStorage.getItem("loggedInMember");
        if (!loggedInMember) {
          console.error("Member not logged in.");
          return;
        }
  
    var memberID = JSON.parse(loggedInMember).memberId;
        // Here, you get the event creator's ID from your response.data
        var eventCreatorId = response.post.memberId; // replace eventCreatorId with the correct field in your response data

        // Check if logged in user is the event creator
        if (memberID === eventCreatorId) {
          $('#sortMatchButton').show();
        } else {
          $('#sortMatchButton').hide();
        }

      } else {
        console.log("No data or invalid data from API.");
      }
    },
    error: function () {
      console.log("API call error.");
    },
  });
});

$(document).ready(function () {
  $("#sortMatchButton").click(function () {
    // Redirect to the manager-match.html page
    window.location.href = "manager-match.html";
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

  // Get current time
  var currentTime = new Date();

  if (currentTime < new Date(eventStartDate)) {
    $(".time-event").text("Sắp diễn ra").addClass("upcoming");
    $("#joinButton").prop("disabled", true);  // disable joinButton
  } else if (currentTime > new Date(eventEndDate)) {
    $(".time-event").text("Đã diễn ra").addClass("past");
    $("#joinButton").prop("disabled", true);  // disable joinButton
  } else {
    $(".time-event").text("Đang diễn ra").addClass("ongoing");
    $("#joinButton").prop("disabled", false);  // enable joinButton
  }


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
        // $("#joinButton").on("click", function () {
        //   // Call the joinEvent or unjoinEvent function based on the event status
        //   const memId = sessionStorage.getItem("loggedInMember");
        //   if (memId) {
        //     var mem = JSON.parse(memId);
        //     var memberId = mem.memberId;
        //   }
        //   if (isJoined) {
        //     unjoinEvent(memberId, postId, function () {
        //       // Callback function after successful unjoin
        //       isJoined = false;
        //       $("#joinButton").text("Join Event");
        //     });
        //   } else {
        //     joinEvent(memberId, postId, function () {
        //       // Callback function after successful join
        //       isJoined = true;
        //       $("#joinButton").text("Unjoin Event");
        //     });
        //   }
        // });
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
// function joinEvent(memberId, postId, successCallback) {
//   $.ajax({
//     url: "https://localhost:7206/api/JoinEvent/Join",
//     method: "POST",
//     headers: {
//       accept: "*/*",
//       "Content-Type": "application/json-patch+json",
//     },
//     data: JSON.stringify({
//       memberId: memberId,
//       postId: postId,
//       isFollow: true,
//       status: true,
//     }),
//     success: function (response) {
//       // Handle success, for example, show a success message or update UI
//       console.log("Successfully joined the event.");
//       if (successCallback) {
//         successCallback();
//       }
//     },
//     error: function () {
//       // Handle error, for example, show an error message or handle the failure
//       console.log("Failed to join the event.");
//     },
//   });
// }

// Function to unjoin an event
// function unjoinEvent(memberId, postId, successCallback) {
//   $.ajax({
//     url: "https://localhost:7206/api/JoinEvent/UnJoin",
//     method: "PUT",
//     headers: {
//       accept: "*/*",
//       "Content-Type": "application/json-patch+json",
//     },
//     data: JSON.stringify({
//       memberId: memberId,
//       postId: postId,
//       isFollow: true,
//       status: true,
//     }),
//     success: function (response) {
//       // Handle success, for example, show a success message or update UI
//       console.log("Successfully unjoined the event.");
//       if (successCallback) {
//         successCallback();
//       }
//     },
//     error: function () {
//       // Handle error, for example, show an error message or handle the failure
//       console.log("Failed to unjoin the event.");
//     },
//   });
// }

// Function to check if the user has already joined the event
// function checkJoinStatus() {
//   const postId = getPostIdFromURL();
//   const memId = sessionStorage.getItem("loggedInMember");
//   if (memId) {
//     var mem = JSON.parse(memId);
//     var memberId = mem.memberId;
//   }
//   const isJoined = sessionStorage.getItem(`joinStatus_${memberId}_${postId}`) === "true";
//   return isJoined;
// }

// Function to set the join status in localStorage
// function setJoinStatus(isJoined) {
//   const postId = getPostIdFromURL();
//   const memId = sessionStorage.getItem("loggedInMember");
//   if (memId) {
//     var mem = JSON.parse(memId);
//     var memberId = mem.memberId;
//   }
//   sessionStorage.setItem(`joinStatus_${memberId}_${postId}`, isJoined ? "true" : "false");
// }

// Function to handle the Join/Unjoin button click
// function handleJoinButtonClick() {
//   var isJoined = checkJoinStatus();
//   const memId = sessionStorage.getItem("loggedInMember");
//   if (memId) {
//     var mem = JSON.parse(memId);
//     var memberId = mem.memberId;
//   }
//   const postId = getPostIdFromURL();

//   if (isJoined) {
//     unjoinEvent(memberId, postId, function () {
//       isJoined = false;
//       $("#joinButton").text("Join Event");
//       setJoinStatus(isJoined); // Save the join status in sessionStorage
//     });
//   } else {
//     joinEvent(memberId, postId, function () {
//       isJoined = true;
//       $("#joinButton").text("Unjoin Event");
//       setJoinStatus(isJoined); // Save the join status in sessionStorage
//     });
//   }
// }

// Function to get the "postId" from the URL
// function getPostIdFromURL() {
//   const urlParams = new URLSearchParams(window.location.search);
//   return urlParams.get("postId");
// }

// Add event listener for the Join/Unjoin button
// $(document).ready(function () {
//   const isJoined = checkJoinStatus();
//   $("#joinButton").text(isJoined ? "Unjoin Event" : "Join Event");
//   $("#joinButton").on("click", handleJoinButtonClick);
// });

// Rest of the existing code...

import { getBirds } from "./services/bird.service.js";
import { join, joinBird, unjoin} from "./services/join-event.service.js";
import { getMembers } from "./services/member.service.js";


$(document).ready(function() {
  var loggedInMember = sessionStorage.getItem("loggedInMember");
  var selectedPostId = sessionStorage.getItem("selectedPostId");
  var chosenBirdId = null;

  if (loggedInMember) {
    var mem = JSON.parse(loggedInMember);
    var memberId = mem.memberId;
  }

  // Variable to store the member's join status
  var hasJoined = false;

  // Get members and check join status
  getMembers().then(function(response) {
    var members = response.data;
    var currentMember = members.find(function(member) {
      return member.memberId === memberId;
    });

    if (currentMember) {
      hasJoined = currentMember.joinEvent.some(function(joinEvent) {
        return joinEvent.status === "tham gia" && joinEvent.postId === selectedPostId;
      });
    }

    if (hasJoined) {
      $('#joinButton').text('Unjoin Event');
    }
  });

  $('.event-chooseB button').first().on('click', function() {
    if (memberId && selectedPostId) {
        joinBird(memberId, selectedPostId).then(function(response) {
            var birds = response.data;

            if (birds.length > 1) {
                var birdOptions = birds.map(function(bird) {
                    return '<option value="' + bird.birdId + '">' + bird.birdName + '</option>';
                }).join('');

                Swal.fire({
                    title: 'Choose a bird',
                    html: '<select id="swal-input1" class="swal2-input">' + birdOptions + '</select>',
                    focusConfirm: false,
                    preConfirm: function () {
                        return {
                            birdId: $('#swal-input1').val(),
                            birdName: $('#swal-input1 option:selected').text()
                        };
                    }
                }).then(function (result) {
                    console.log('Bird chosen:', result.value);
                    $('#chosenBird').text('Chosen bird: ' + result.value.birdName);
                    chosenBirdId = result.value.birdId;
                    sessionStorage.setItem('chosenBirdId', chosenBirdId);
                });
            } else {
                var bird = birds[0];
                console.log('Bird chosen:', bird);
                $('#chosenBird').text('Chosen bird: ' + bird.birdName);
                chosenBirdId = bird.birdId;
            }
        }).catch(function(error) {
            console.error('Failed to join bird:', error);
            Swal.fire('Error!', 'Failed to join bird.', 'error');
        });
    } else {
        Swal.fire('Error!', 'No member is logged in or no post selected.', 'error');
    }
  });

  var joinButton = $('#joinButton');
  joinButton.on('click', function() {
    // Retrieve the chosenBirdId from the session storage
    var chosenBirdId = sessionStorage.getItem('chosenBirdId');

    if (joinButton.text() === 'Unjoin Event') {
      if (chosenBirdId) {
        unjoin(memberId, selectedPostId, chosenBirdId, function() {
            Swal.fire('Success!', 'You have unjoined the event!', 'success');
            joinButton.text('Join Event');

            // Remove the chosenBirdId from the session storage
            sessionStorage.removeItem('chosenBirdId');
          }).catch(function(error) {
            console.error('Failed to unjoin event:', error);
            Swal.fire('Error!', 'Failed to unjoin event.', 'error');
        });
      } else {
        Swal.fire('Error!', 'No bird has been chosen.', 'error');
      }
    } else {
        if (chosenBirdId) {
            join(memberId, selectedPostId, chosenBirdId, function() {
                Swal.fire('Success!', 'You have joined the event!', 'success');
                joinButton.text('Unjoin Event');
            }).catch(function(error) {
                console.error('Failed to join event:', error);
                Swal.fire('Error!', 'Failed to join event.', 'error');
            });
        } else {
            Swal.fire('Error!', 'No bird has been chosen.', 'error');
        }
    }
  });
});

var urlParams = new URLSearchParams(window.location.search);
var postIdFromUrl = urlParams.get('postId');
var loggedInMember = JSON.parse(sessionStorage.getItem("loggedInMember"));
var postIdFromSession = loggedInMember.postId; // Giả sử bạn lưu postId vào session như vậy

// if (postIdFromUrl === postIdFromSession) {
//   $('#sortMatchButton').show(); // Hiển thị nút Sort Match nếu postId từ URL giống với postId từ phiên
// } else {
//   $('#sortMatchButton').hide(); // Ẩn nút Sort Match nếu không
// }

