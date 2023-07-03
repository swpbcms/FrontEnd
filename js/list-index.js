
$(document).ready(function () {
  var loggedInMember = sessionStorage.getItem("loggedInMember");
  if (loggedInMember) {
    var mem = JSON.parse(loggedInMember);

    var memberFullName = mem.memberFullName;
    var memberImage = mem.memberImage;
    $('#fullname').html(memberFullName);
    $('#image').attr('src', memberImage);
  }
});


$(document).ready(function () {
  $("#logoutButton").click(function () {
    // Clear the session storage
    sessionStorage.removeItem("loggedInMember");
    // Redirect to the login page or perform any other desired action
    window.location.href = "feed.html";
  });
})


$.ajax({
  url: 'https://localhost:7206/api/Post/get-post',
  method: 'GET',
  success: function (response) {
    // Kiểm tra dữ liệu trả về từ API
    if (response && response.data) {
      // Hiển thị dữ liệu
      displayData(response.data);
    } else {
      console.log('Không có dữ liệu hoặc dữ liệu không hợp lệ từ API.');
    }
  },
  error: function () {
    console.log('Lỗi khi gọi API.');
  }
});

// Hàm để hiển thị dữ liệu lên trang web
function displayData(data) {
  // Truy cập phần tử HTML để hiển thị dữ liệu
  var outputElement = $('#userpost');

  // Kiểm tra nếu dữ liệu rỗng
  if (data.length === 0) {
    outputElement.text('Không có dữ liệu để hiển thị.');
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

    // Tạo HTML để hiển thị thông tin bài viết
    var postHTML = '<div class="main-wraper">';
    postHTML += '<div class="user-post">';
    postHTML += '<div class="friend-info">';
    postHTML += '    <figure>';
    postHTML += '        <em>';
    postHTML += '            <svg style="vertical-align: middle;" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="#7fba00" stroke="#7fba00" d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"></path></svg>';
    postHTML += '        </em>';
    postHTML += '        <img alt="" src="' + memberImage + '" id="memberImage">';
    postHTML += '    </figure>';
    postHTML += '    <div class="friend-name">';
    postHTML += '        <div class="more">';
    postHTML += '            <div class="more-post-optns">';
    postHTML += '                <i class="">';
    postHTML += '                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>';
    postHTML += '                </i>';
    postHTML += '                <ul>';
    postHTML += '                    <li>';
    postHTML += '                        <i class="icofont-pen-alt-1"></i>Edit Post';
    postHTML += '                        <span>Edit This Post within a Hour</span>';
    postHTML += '                    </li>';
    postHTML += '                    <li>';
    postHTML += '                        <i class="icofont-ban"></i>Hide Post';
    postHTML += '                        <span>Hide This Post</span>';
    postHTML += '                    </li>';
    postHTML += '                    <li>';
    postHTML += '                        <i class="icofont-ui-delete"></i>Delete Post';
    postHTML += '                        <span>If inappropriate Post By Mistake</span>';
    postHTML += '                    </li>';
    postHTML += '                    <li>';
    postHTML += '                        <i class="icofont-flag"></i>Report';
    postHTML += '                        <span>Inappropriate content</span>';
    postHTML += '                    </li>';
    postHTML += '                </ul>';
    postHTML += '            </div>';
    postHTML += '        </div>';
    postHTML += '        <ins><a title="" href="profile.html">' + memberFullName + '</a></ins>';
    postHTML += '        <span><i class="icofont-globe"></i>' + postCreateAt + '</span>';
    postHTML += '    </div>';
    postHTML += '<div class="post-meta">';
    postHTML += '    <figure>';
    postHTML += '        <a data-toggle="modal" data-target="#img-comt" href="images/resources/album1.jpg">';
    postHTML += '            <img src="images/resources/study.jpg" alt="">';
    postHTML += '        </a>';
    postHTML += '    </figure>';
    postHTML += '<a href="post-detail.html" class="post-title">' + postTitle + '</a>';
    postHTML += '<p>' + postDescription + '</p>';
    postHTML += '    <div class="we-video-info">';
    postHTML += '        <ul>';
    postHTML += '            <li>';
    postHTML += '                <span title="views" class="views">';
    postHTML += '                    <i>';
    postHTML += '                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
    postHTML += '                    </i>';
    postHTML += '                    <ins>' + likePost + '</ins>';
    postHTML += '                </span>';
    postHTML += '            </li>';
    postHTML += '            <li>';
    postHTML += '        </ul>';
    postHTML += '        <a href="post-detail.html" title="" class="reply">Reply <i class="icofont-reply"></i></a>';
    postHTML += '    </div>';
    postHTML += '</div>';
    postHTML += '<div class="stat-tools">';
    postHTML += '    <div class="box">';
    postHTML += '        <div class="Like"><a class="Like__link"><i class="icofont-like"></i> Like</a>';
    postHTML += '            <div class="Emojis">';
    postHTML += '                <div class="Emoji Emoji--like">';
    postHTML += '                    <div class="icon icon--like"></div>';
    postHTML += '                </div>';
    postHTML += '                <div class="Emoji Emoji--love">';
    postHTML += '                    <div class="icon icon--heart"></div>';
    postHTML += '                </div>';
    postHTML += '                <div class="Emoji Emoji--haha">';
    postHTML += '                    <div class="icon icon--haha"></div>';
    postHTML += '                </div>';
    postHTML += '                <div class="Emoji Emoji--wow">';
    postHTML += '                    <div class="icon icon--wow"></div>';
    postHTML += '                </div>';
    postHTML += '                <div class="Emoji Emoji--sad">';
    postHTML += '                    <div class="icon icon--sad"></div>';
    postHTML += '                </div>';
    postHTML += '                <div class="Emoji Emoji--angry">';
    postHTML += '                    <div class="icon icon--angry"></div>';
    postHTML += '                </div>';
    postHTML += '            </div>';
    postHTML += '        </div>';
    postHTML += '    <a title="" href="#" class="comment-to"><i class="icofont-comment"></i> Comment</a>';
    postHTML += '    <a title="" href="#" class="share-to"><i class="icofont-share-alt"></i> Share</a>';
    postHTML += '</div>';
    postHTML += '<div class="new-comment" style="display: block;">';
    postHTML += '    <form method="post">';
    postHTML += '        <input type="text" placeholder="write comment">';
    postHTML += '        <button type="submit"><i class="icofont-paper-plane"></i></button>';
    postHTML += '    </form>';
    postHTML += '</div>';
    postHTML += '</div>';

    $.each(comments, function (commentIndex, comment) {
      var commentPostId = comment.postId;
      if (commentPostId === postId) { // Kiểm tra comment thuộc postId hiện tại
        var memberId = comment.memberId;
        var commentContent = comment.commentContent;
        var dateComment = comment.dateTime;

        postHTML += '    <div class="comments-area">';
        postHTML += '        <ul>';
        postHTML += '            <li>';
        postHTML += '                <figure><img alt="" src="' + memberImage + '">';
        postHTML += '                 </figure>';
        postHTML += '                <div class="commenter">';
        postHTML += '                    <h5><a title="" href="#">' + memberId + '</a></h5>';
        postHTML += '                    <span>' + dateComment + '</span>';
        postHTML += '                    <p>' + commentContent + '</p>';
        postHTML += '                </div>';
        postHTML += '                <a title="Like" href="#"><i class="icofont-heart"></i></a>';
        postHTML += '                <a title="Reply" href="#" class="reply-comment"><i class="icofont-reply"></i></a>';
        postHTML += '                <div class="comment-reply">';
        postHTML += '                            <figure>';
        postHTML += '                                <img src="user-avatar.jpg" alt="User Avatar">';
        postHTML += '                            </figure>';
        postHTML += '                               <div class="commenter">';
        postHTML += '                                <h5><a title="" href="#">' + memberId + '</a></h5>';
        postHTML += '                                <span class="comment-date">July 4, 2023</span>';
        postHTML += '                                <p class="comment-content">This is a reply to the main comment.</p>';
        postHTML += '                            </div>';
        postHTML += '                            </div>';

        postHTML += '            </li>';
        postHTML += '        </ul>';
        postHTML += '    </div>';
        postHTML += '</div>';
        postHTML += '</div>';
        postHTML += '</div>';
        postHTML += '</div>';
        postHTML += '</div>';
        postHTML += '</div>';
        postHTML += '</div>';
      }
      // Thêm HTML vào phần tử hiển thị
      outputElement.append(postHTML);
    })

  });
}










