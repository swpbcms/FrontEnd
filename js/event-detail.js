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

$.ajax({
  url: "https://localhost:7206/api/Post/get-post",
  method: "GET",
  success: function (response) {
    // Kiểm tra dữ liệu trả về từ API
    if (response && response.data) {
      // Lưu các postId vào mảng
      var postIds = response.data.map(function (post) {
        return post.postId;
      });

      // Lưu mảng postIds vào local storage
      localStorage.setItem("postIds", JSON.stringify(postIds));

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

function displayData(posts) {
  // for simplicity, let's take the first post
  // please modify accordingly if you have multiple posts or other criteria
  var post = posts[0];

  if (post.postTitle && post.media && post.postCreateAt) {
      // set title
      $(".main-title").text(post.postTitle);

      // set image
      if (post.media.length > 0) {
          $(".event-detail-img img").attr("src", post.media[0].linkMedia);
      }

      // format date
      var date = new Date(post.postCreateAt);
      var formattedDate = date.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short',
          hour12: true
      });

      // set date
      $(".event-schedule h5").html(formattedDate);

      // set event website
      // Not sure where this should link to, using first media item as an example
      if (post.media.length > 0) {
          $(".event-desc a").attr("href", post.media[0].linkMedia);
      }

      // assuming you also have location, description and count of people in your post object
      $(".event-loc span").text(post.eventLocation);
      $(".event-desc p").text(post.postDescription);
      $(".event-loc strong").text(post.postNumberJoin + " peoples has reached to join this event.");
  }
}

