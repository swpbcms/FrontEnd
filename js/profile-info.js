$(document).ready(function () {
    var loggedInMember = sessionStorage.getItem("loggedInMember");
    if (loggedInMember) {
      var mem = JSON.parse(loggedInMember);
  
      var memberFullName = mem.memberFullName;
      var memberImage = mem.memberImage;
      var memberEmail = mem.memberEmail;
      $("#fullname").html(memberFullName);
      $("#full-name").html(memberFullName);
      $("#image").attr("src", memberImage);
      $("#imagev2").attr("src", memberImage);
      $("#email").html(memberEmail);
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

import {getPostsUser} from "./services/post.service.js";

$(document).ready(function () {
  // Call the getPostsUser function
  getPostsUser().then(data => {
    // Once the data is received, pass it to displayData
    displayData(data.data);
  }).catch(error => {
    // If there's an error, log it
    console.error("An error occurred:", error);
  });
});


function displayData(data) {
  // Truy cập phần tử HTML để hiển thị dữ liệu
  var outputElement = $("#userpost");

  // Kiểm tra nếu dữ liệu rỗng
  if (data.length === 0) {
    outputElement.text("Không có dữ liệu để hiển thị.");
    return;
  }

  // Duyệt qua từng đối tượng dữ liệu và hiển thị lên trang web
  var sessionMemberId = sessionStorage.getItem('loggedInMember');
  if (sessionMemberId) {
    var mem = JSON.parse(sessionMemberId);
    var memberId = mem.memberId;
  }
  
  $.each(data, function (index, item) {
    var postStatus = item.postStatus;
    var member = item.member;

    // Kiểm tra nếu postStatus là "Thành công" và memberId trùng khớp với sessionMemberId
    if (postStatus === "Thành công" && member && member.memberId === memberId) {
      var postTitle = item.postTitle;
      var postDescription = item.postDescription;
      var memberFullName = member.memberFullName;
      var memberImage = member.memberImage;
      var comments = member.comment;
      var likePost = item.postNumberLike;
      var postCreateAt = item.postCreateAt;
      var postId = item.postId;
      var mediaItems = item.media;

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
      // postHTML += '                <i class="">';
      // postHTML +=
      //   '                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>';
      // postHTML += "                </i>";
      // postHTML += "                <ul>";
      // postHTML += "                    <li>";
      // // postHTML +=
      // //   '                        <i href="#" class="icofont-pen-alt-1"></i>Edit Post';
      // // postHTML +=
      // //   "                        <span>Edit This Post within a Hour</span>";
      // postHTML += "                    </li>";
      // // postHTML += "                    <li>";
      // // postHTML += '                        <i class="icofont-ban"></i>Hide Post';
      // // postHTML += "                        <span>Hide This Post</span>";
      // // postHTML += "                    </li>";
      // postHTML += "                    <li>";
      // postHTML +=
      //   '                        <i class="icofont-ui-delete"></i>Delete Post';
      // postHTML +=
      //   "                        <span>If inappropriate Post By Mistake</span>";
      // postHTML += "                    </li>";
      // postHTML += "                    <li>";
      // postHTML += '                        <i class="icofont-flag report" data-id="' + postId + '"></i>Report';
      // postHTML += "                        <span>Inappropriate content</span>";
      // postHTML += "                    </li>";
      // postHTML += "                </ul>";
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
      // Add the figure for media images if there are any
      // Check if there are any media items to display
      if (mediaItems && mediaItems.length > 0) {
        // If there's only one media item, display it in full
        if (mediaItems.length === 1) {
          var linkMedia = mediaItems[0].linkMedia;
          postHTML += `
          <figure class="img-full">
            <a data-toggle="modal" data-target="#img-comt" href="${linkMedia}">
              <img src="${linkMedia}" alt="Media">
            </a>
          </figure>
        `;
        } else {
          // Otherwise, display the media items in a grid layout with the "more photos" link
          postHTML += `
          <figure class="img-bunch">
            <div class="row">
        `;

          // Loop through each media item and add its image link to the figure
          var displayedMediaCount = Math.min(5, mediaItems.length); // Display up to 5 media items
          for (var i = 0; i < displayedMediaCount; i++) {
            var linkMedia = mediaItems[i].linkMedia;
            postHTML += `
            <div class="col-lg-6 col-md-6 col-sm-6">
              <figure>
                <a data-toggle="modal" data-target="#img-comt" href="${linkMedia}">
                  <img src="${linkMedia}" alt="Media">
                </a>
              </figure>
            </div>
          `;
          }

          // Add "more photos" if there are additional media items
          if (mediaItems.length > 5) {
            var morePhotosCount = mediaItems.length - 5;
            postHTML += `
            <div class="col-lg-6 col-md-6 col-sm-6">
              <figure>
                <a data-toggle="modal" data-target="#img-comt" href="${mediaItems[5].linkMedia}">
                  <img src="${mediaItems[5].linkMedia}" alt="More Photos">
                </a>
                <div class="more-photos">
                  <span>+${morePhotosCount}</span>
                </div>
              </figure>
            </div>
          `;
          }
          postHTML += `
            </div>
          </figure>
        `;
        }
      }
      postHTML += "</div>";
      postHTML +=
        '<a href="post-detail.html" class="post-title">' + postTitle + "</a>";
      postHTML += "<p>" + postDescription + "</p>";
      postHTML += '    <div class="we-video-info">';
      postHTML += "        <ul>";
      postHTML += "            <li>";
      // postHTML += '                <span title="views" class="views">';
      // postHTML += "                    <i>";
      // postHTML +=
      //   '                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
      // postHTML += "                    </i>";
      // postHTML += "                    <ins>" + likePost + "</ins>";
      // postHTML += "                </span>";
      postHTML += '<span title="views" class="viewsLike">';
      postHTML += '  <i class="fas fa-thumbs-up"></i>';
      postHTML += '  <ins>' + likePost + '</ins>';
      postHTML += '</span>';

      postHTML += "            </li>";
      postHTML += "            <li>";
      postHTML += "        </ul>";
      // postHTML +=
      //   '        <a href="post-detail.html" title="" class="reply">Reply <i class="icofont-reply"></i></a>';
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
        '    <button title="" class="comment-to"><i class="icofont-comment"></i> Comment</button>';
      postHTML += '    <button title="" class="report-to" data-id="' + postId + '"><i class="icofont-share-alt"></i> Report</button>';
      postHTML += "</div>";
      postHTML += '<div class="new-comment" style="display: block;">';
      postHTML += '    <form method="post">';
      postHTML += '        <input type="text" class="comment-input" placeholder="write comment">';
      postHTML +=
        '        <button type="submit"><i class="icofont-paper-plane"></i></button>';
      postHTML += "    </form>";
      postHTML += "</div>";

      // Check if there are any comments
      if (item.comment && item.comment.length > 0) {
        var commentToDisplay;

        if (item.comment.length === 1) {
          // If there's only one comment, select it to display
          commentToDisplay = item.comment[0];
        } else {
          // If there are multiple comments, sort them and select the most recent one
          var sortedComments = item.comment.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
          commentToDisplay = sortedComments[0];
        }

        // Check if replyId is null, inverseReply is an empty array, and postId matches
        if (commentToDisplay.postId === item.postId) {
          var commentMemberImage = commentToDisplay.member.memberImage;
          var commentContent = commentToDisplay.commentContent;
          var commentDateTime = commentToDisplay.dateTime;
          var commentMemberFullName = commentToDisplay.member.memberFullName;


          // Build HTML to display the comment
          postHTML += `<div class="comments-area">
    <ul>
        <li>
            <figure>
                <img alt="" src="${commentMemberImage}">
            </figure>
            <div class="commenter">
                <h5>
                    <a title="" href="#">${commentMemberFullName}</a>
                </h5>
                <span>${commentDateTime}</span>
                <p>${commentContent}</p>
            </div>
        </li>
    </ul>
    </div>`;
        }
      }
      // <a title="Like" href="#"><i class="icofont-heart"></i></a>
      // <a title="Reply" href="#" class="reply-comment"><i class="icofont-reply"></i></a>
      // });
      // postHTML += '    <div class="comments-area">';
      // postHTML += '        <ul>';
      // postHTML += '            <li>';
      // postHTML += '                <figure><img alt="" src="">';
      // postHTML += '                 </figure>';
      // postHTML += '                <div class="commenter">';
      // postHTML += '                    <h5><a title="" href="#"></a> '+ memberId +'</h5>';
      // postHTML += '                    <span> '+ commentContent +' </span>';
      // postHTML += '                    <p>' + dateComment + '</p>';
      // postHTML += '                </div>';
      // postHTML += '                <a title="Like" href="#"><i class="icofont-heart"></i></a>';
      // postHTML += '                <a title="Reply" href="#" class="reply-comment"><i class="icofont-reply"></i></a>';
      // postHTML += '                <div class="comment-reply">';
      // postHTML += '                            <figure>';
      // postHTML += '                                <img src="" alt="">';
      // postHTML += '                            </figure>';
      // postHTML += '                               <div class="commenter">';
      // postHTML += '                                <h5><a title="" href="#"></a></h5>';
      // postHTML += '                                <span class="comment-date"></span>';
      // postHTML += '                                <p class="comment-content"></p>';
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
      // Thêm HTML vào phần tử hiển thị
      outputElement.append(postHTML);
    }
  });
}

  // Bắt sự kiện click cho mỗi nút có class .report-to
$(document).on("click", ".report-to", function () {
  var postIdButton = $(this).closest(".user-post").find(".post-id").text();

  // Lưu giá trị vào sessionStorage
  sessionStorage.setItem('reportedPostId', postIdButton);

  // Chuyển đến trang send-report.html
  window.location.href = 'send-report.html';
});

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

    // Check if the post has been liked by the user
    var likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    var likedPostIndex = likedPosts.findIndex(function (likedPost) {
      return likedPost.postId === postId && likedPost.memberId === memberId;
    });
    var isLiked = likedPostIndex !== -1;

    // Depending on whether the post has been liked, call the "Like" or "disLike" API
    var url = isLiked
      ? "https://localhost:7206/api/Like/disLike"
      : "https://localhost:7206/api/Like/Like";

    // Create the data object for the API request
    var likeData = {
      memberId: memberId,
      postId: postId,
      dateTime: dateTime,
    };

    // Send the AJAX request to the API
    $.ajax({
      url: url,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(likeData),
      success: function (response) {
        // Update the list of liked posts in localStorage
        if (isLiked) {
          likedPosts.splice(likedPostIndex, 1);
        } else {
          likedPosts.push({ postId: postId, memberId: memberId });
        }
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));

        // Handle the success response (if needed)
        console.log(isLiked ? "disLike successful" : "Like successful");
        location.reload();
      },
      error: function (xhr, status, error) {
        // Handle the error (if needed)
        console.log(isLiked ? "Error disliking post" : "Error liking post");
      },
    });
  }
});

// Comment 
$(document).on("submit", ".new-comment form", function (event) {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Get the postId from the hidden element within the post HTML
  var postId = $(this).closest(".user-post").find(".post-id").text();

  // Get the memberId from the session storage
  var loggedInMember = sessionStorage.getItem("loggedInMember");
  if (loggedInMember) {
    var mem = JSON.parse(loggedInMember);
    var memberId = mem.memberId;

    // Get the comment content from the input field
    var commentContent = $(this).find(".comment-input").val();

    // Create the data object for the "Comment" API request
    var commentData = {
      memberId: memberId,
      postId: postId,
      commentContent: commentContent
    };

    // Send the AJAX request to the "Comment" API
    $.ajax({
      url: "https://localhost:7206/api/Comment/Comment",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(commentData),
      success: function (response) {
        // Handle the success response (if needed)
        console.log("Comment successful");
        location.reload();
      },
      error: function (xhr, status, error) {
        // Handle the error (if needed)
        console.log("Error commenting");
      },
    });
  }
});