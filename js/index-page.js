import { getComments } from "./services/comment.service.js";
import {
  createPost,
  deletePost,
  getJoinPosts,
  getLikePosts,
  getPosts,
  getPostsUser,
  moderatePost,
  searchPostsManager,
  searchPostsUser,
  updatePost,
} from "./services/post.service.js";
import {
  createCategory,
  getCategories,
  getCategoryByID,
  getCategoryByName,
  updateCategory,
} from "./services/categories.service.js";
import { dislike, like } from "./services/like.service.js";

let comments = [];
let posts = [];
let categories = [];
window.addEventListener("DOMContentLoaded", async () => {
  // await getComments().then(data => comments = data);
  // await getPosts().then(data => posts = data);
  // await getCategories().then(data => categories = data);
  // await getCategoryByName("Chim bồ câu").then(data => console.log(data));
  // await getCategoryByID("Cate10d7de").then(data => console.log(data));
  // await createCategory("Chim chích chòe", "this is chim cc").then(data => console.log(data));
  // await updateCategory("Cateaa306a","Chim chích chòe nè", "this is chim cchoe").then(data => console.log(data));
  await getPostsUser().then((data) => console.log(data));
  // await createPost(
  //   "chim chích chòe nè",
  //   "chim cc 2",
  //   "hcm",
  //   "2023-06-28T13:24:08.660",
  //   "2023-06-28T13:24:08.660",
  //   "Mem40080c3",
  //   [{ categoryID: "Cate10d7de" }],
  //   [{ linkMedia: "MNG91188d0" }]
  // ).then((data) => console.log(data));
  // await searchPostsUser("bồ câu").then(data => console.log(data));
  // await searchPostsManager().then(data => console.log(data));
  // await getJoinPosts("Postca781f").then(data => console.log(data));
  // await getLikePosts("Postca781f").then(data => console.log(data));
  // await updatePost(
  //   "Post78bf71",
  //   "chim chích chòe nèeeee",
  //   "chim cc 22222",
  //   "hcmmmmm",
  //   "2023-06-28T13:24:08.660",
  //   "2023-06-28T13:24:08.660",
  //   "Mem047047c",
  //   [{ categoryID: "Cate10d7de" }],
  //   [{ linkMedia: "MNG91188d0" }]
  // ).then((data) => console.log(data));
  // await deletePost("Postca781f").then((data) => console.log(data));
  // await moderatePost("Post7a4917", true, "MNG91188d0").then((data) => console.log(data));

  await like("Mem40080c3", "Posta05a2c").then((data) => console.log(data));
  await dislike("Mem40080c3", "Posta05a2c").then((data) => console.log(data));
});

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

// Hàm để hiển thị dữ liệu lên trang web
function displayData(data) {
  // Truy cập phần tử HTML để hiển thị dữ liệu
  var outputElement = $("#userpost");

  // Kiểm tra nếu dữ liệu rỗng
  if (data.length === 0) {
    outputElement.text("Không có dữ liệu để hiển thị.");
    return;
  }

  // Duyệt qua từng đối tượng dữ liệu và hiển thị lên trang web
  $.each(data, function (index, item) {
    var postTitle = item.postTitle;
    var postDescription = item.postDescription;
    var memberFullName = item.member.memberFullName;
    var memberImage = item.member.memberImage;
    var comments = item.member.comment;
    var likePost = item.postNumberLike;
    var postCreateAt = item.postCreateAt;
    var postId = item.postId;

    // $.each(comments, function (commentIndex, comment) {
    //   var commentPostId = comment.postId;
    //   if (commentPostId === postId) { // Kiểm tra comment thuộc postId hiện tại
    //     var memberId = comment.memberId;
    //     var commentContent = comment.commentContent;
    //     var dateComment = comment.dateTime;
    //     var inverseComment = comment.inverseReply;

    // Tạo HTML để hiển thị thông tin bài viết
    var postHTML = '<div class="main-wraper">';
    postHTML += '<div class="user-post">';
    postHTML += '<div class="friend-info">';
    postHTML += "    <figure>";
    postHTML += "        <em>";
    postHTML +=
      '            <svg style="vertical-align: middle;" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="#7fba00" stroke="#7fba00" d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"></path></svg>';
    postHTML += "        </em>";
    postHTML +=
      '        <img alt="" src="' + memberImage + '" id="memberImage">';
    postHTML += "    </figure>";
    postHTML += '    <div class="friend-name">';
    postHTML += '        <div class="more">';
    postHTML += '            <div class="more-post-optns">';
    postHTML += '                <i class="">';
    postHTML +=
      '                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>';
    postHTML += "                </i>";
    postHTML += "                <ul>";
    postHTML += "                    <li>";
    postHTML +=
      '                        <i class="icofont-pen-alt-1"></i>Edit Post';
    postHTML +=
      "                        <span>Edit This Post within a Hour</span>";
    postHTML += "                    </li>";
    postHTML += "                    <li>";
    postHTML += '                        <i class="icofont-ban"></i>Hide Post';
    postHTML += "                        <span>Hide This Post</span>";
    postHTML += "                    </li>";
    postHTML += "                    <li>";
    postHTML +=
      '                        <i class="icofont-ui-delete"></i>Delete Post';
    postHTML +=
      "                        <span>If inappropriate Post By Mistake</span>";
    postHTML += "                    </li>";
    postHTML += "                    <li>";
    postHTML += '                        <i class="icofont-flag"></i>Report';
    postHTML += "                        <span>Inappropriate content</span>";
    postHTML += "                    </li>";
    postHTML += "                </ul>";
    postHTML += "            </div>";
    postHTML += "        </div>";
    postHTML +=
      '        <ins><a title="" href="profile.html">' +
      memberFullName +
      "</a></ins>";
    postHTML +=
      '        <span><i class="icofont-globe"></i>' + postCreateAt + "</span>";
    postHTML += "    </div>";
    postHTML +=
      '<div class="post-id" id="postId" style="display: none;">' +
      postId +
      "</div>";
    postHTML += '<div class="post-meta">';
    postHTML += "    <figure>";
    postHTML +=
      '        <a data-toggle="modal" data-target="#img-comt" href="images/resources/album1.jpg">';
    postHTML += '            <img src="images/resources/study.jpg" alt="">';
    postHTML += "        </a>";
    postHTML += "    </figure>";
    postHTML +=
      '<a href="post-detail.html" class="post-title">' + postTitle + "</a>";
    postHTML += "<p>" + postDescription + "</p>";
    postHTML += '    <div class="we-video-info">';
    postHTML += "        <ul>";
    postHTML += "            <li>";
    postHTML += '                <span title="views" class="views">';
    postHTML += "                    <i>";
    postHTML +=
      '                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
    postHTML += "                    </i>";
    postHTML += "                    <ins>" + likePost + "</ins>";
    postHTML += "                </span>";
    postHTML += "            </li>";
    postHTML += "            <li>";
    postHTML += "        </ul>";
    postHTML +=
      '        <a href="post-detail.html" title="" class="reply">Reply <i class="icofont-reply"></i></a>';
    postHTML += "    </div>";
    postHTML += "</div>";
    postHTML += '<div class="stat-tools">';
    postHTML += '<div class="box">';
    postHTML += '    <div class="Like">';
    // postHTML += '        <a class="Like__link"><i class="icofont-like"></i> Like</a>';
    postHTML +=
      '        <button class="likeButton"> <i class="icofont-like"></i> Like</button>';
    postHTML += "    </div>";
    postHTML += "</div>";
    postHTML +=
      '    <a title="" href="#" class="comment-to"><i class="icofont-comment"></i> Comment</a>';
    postHTML +=
      '    <a title="" href="#" class="share-to"><i class="icofont-share-alt"></i> Share</a>';
    postHTML += "</div>";
    postHTML += '<div class="new-comment" style="display: block;">';
    postHTML += '    <form method="post">';
    postHTML += '        <input type="text" placeholder="write comment">';
    postHTML +=
      '        <button type="submit"><i class="icofont-paper-plane"></i></button>';
    postHTML += "    </form>";
    postHTML += "</div>";
    postHTML += "</div>";

    // postHTML += '    <div class="comments-area">';
    // postHTML += '        <ul>';
    // postHTML += '            <li>';
    // postHTML += '                <figure><img alt="" src="' + memberImage + '">';
    // postHTML += '                 </figure>';
    // postHTML += '                <div class="commenter">';
    // postHTML += '                    <h5><a title="" href="#">' + memberId + '</a></h5>';
    // postHTML += '                    <span>' + dateComment + '</span>';
    // postHTML += '                    <p>' + commentContent + '</p>';
    // postHTML += '                </div>';
    // postHTML += '                <a title="Like" href="#"><i class="icofont-heart"></i></a>';
    // postHTML += '                <a title="Reply" href="#" class="reply-comment"><i class="icofont-reply"></i></a>';
    // postHTML += '                <div class="comment-reply">';
    // postHTML += '                            <figure>';
    // postHTML += '                                <img src="" alt="">';
    // postHTML += '                            </figure>';
    // postHTML += '                               <div class="commenter">';
    // postHTML += '                                <h5><a title="" href="#">' + memberId + '</a></h5>';
    // postHTML += '                                <span class="comment-date"></span>';
    // postHTML += '                                <p class="comment-content">' + inverseComment + '</p>';
    // postHTML += '                            </div>';
    // postHTML += '                            </div>';
    // postHTML += '            </li>';
    // postHTML += '        </ul>';
    // postHTML += '    </div>';

    postHTML += "</div>";
    postHTML += "</div>";
    postHTML += "</div>";
    postHTML += "</div>";
    postHTML += "</div>";
    postHTML += "</div>";
    postHTML += "</div>";

    // }

    // Thêm HTML vào phần tử hiển thị
    outputElement.append(postHTML);
  });
}

// Event listener for the "Like" button
$(document).on("click", ".likeButton", function () {
  // Get the postId from the hidden element within the post HTML
  var postId = $(this).closest(".user-post").find(".post-id").text();

  // Get the memberId from the session storage
  var loggedInMember = sessionStorage.getItem("loggedInMember");
  if (loggedInMember) {
    var mem = JSON.parse(loggedInMember);
    var memberId = mem.memberId;

    // Get the current date and time
    var dateTime = new Date().toISOString();

    // Create the data object for the "Like" API request
    var likeData = {
      memberId: memberId,
      postId: postId,
      dateTime: dateTime,
    };

    // Send the AJAX request to the "Like" API
    $.ajax({
      url: "https://localhost:7206/api/Like/Like",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(likeData),
      success: function (response) {
        // Handle the success response (if needed)
        console.log("Like successful");
      },
      error: function (xhr, status, error) {
        // Handle the error (if needed)
        console.log("Error liking post");
      },
    });
  }
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

// Create new Post
$(document).ready(function () {
  $("#myForm").submit(function (event) {
    event.preventDefault();

    // Lấy giá trị của memberId từ session
    var memberId = sessionStorage.getItem("loggedInMember");
    if (memberId) {
      var mem = JSON.parse(memberId);

      var memberID = mem.memberId;
    }
    // Lấy giá trị của các trường
    var title = $("#title").val();
    var description = $("#description").val();
    var checkbox2 = $("#checkbox2").is(":checked");
    // var datetimepicker = $('#datetimepicker').val();
    var eventLocation = $("#eventLocation").val();
    var memberid = mem.memberId;
    var category = "Cate721a1d";

    // var postData = {
    //   category = 
    //   postTitle: title,
    //   postDescription: description,
    //   postIsEvent: checkbox2 ? true : false,
    //   eventLocation: eventLocation,
    //   memberId: memberID
    // };

    var postData = {
      postTitle: title,
      postDescription: description,
      postIsEvent: checkbox2 ? true : false,
      eventLocation: eventLocation,
      memberId: memberID
    };

    // Gửi yêu cầu AJAX
    $.ajax({
      url: "https://localhost:7206/api/Post/create-post",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(postData),
      success: function (response) {
        // Xử lý phản hồi từ máy chủ (nếu cần)
        alert("Bài post đã được publish");
        location.reload(); // Load lại trang
      },
      error: function (xhr, status, error) {
        // Xử lý lỗi (nếu có)
        alert("Không thể publish bài post");
      },
    });
  });
});


//Validate popup create new post
$(document).ready(function () {
  $("#checkbox1").change(function () {
    if ($(this).is(":checked")) {
      $("#checkbox2").prop("checked", false);
      $("#eventLocation").prop("readonly", "readonly");
    }
  });

  $("#checkbox2").change(function () {
    if ($(this).is(":checked")) {
      $("#checkbox1").prop("checked", false);
      $("#eventLocation").removeAttr("readonly");
    } else {
      $("#eventLocation").prop("readonly", "readonly");
      $("#eventLocation").val("");
    }
  });
});

$(document).ready(function () {
  // Event listener for the "Like" action
  $(document).on("click", ".like-button", function () {
    // Get the postId from the data attribute of the button
    var postId = $(this).data("post-id");

    // Get the memberId from the session storage
    var loggedInMember = sessionStorage.getItem("loggedInMember");
    if (loggedInMember) {
      var mem = JSON.parse(loggedInMember);
      var memberId = mem.memberId;

      // Create the data object for the "Like" API request
      var likeData = {
        memberId: memberId,
        postId: postId,
        dateTime: new Date().toISOString(),
      };

      // Send the AJAX request to the PHP script
      $.ajax({
        url: "like.php",
        type: "POST",
        data: likeData,
        success: function (response) {
          // Handle the success response (if needed)
          console.log(response);
        },
        error: function (xhr, status, error) {
          // Handle the error (if needed)
          console.log("Error liking post");
        },
      });
    }
  });
});
