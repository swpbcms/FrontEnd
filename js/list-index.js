
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
    postHTML += '        <ins><a title="" href="time-line.html">' + memberFullName + '</a> Shared Link</ins>';
    postHTML += '        <span><i class="icofont-globe"></i> published: Sep,15 2020</span>';
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
    postHTML += '                    <ins>1.2k</ins>';
    postHTML += '                </span>';
    postHTML += '            </li>';
    postHTML += '            <li>';
    postHTML += '                <span title="Comments" class="Recommend">';
    postHTML += '                    <i>';
    postHTML += '                        <svg class="feather feather-message-square" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    postHTML += '                    </i>';
    postHTML += '                    <ins>54</ins>';
    postHTML += '                </span>';
    postHTML += '            </li>';
    postHTML += '            <li>';
    postHTML += '                <span title="follow" class="Follow">';
    postHTML += '                    <i>';
    postHTML += '                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
    postHTML += '                    </i>';
    postHTML += '                    <ins>5k</ins>';
    postHTML += '                </span>';
    postHTML += '            </li>';
    postHTML += '            <li>';
    postHTML += '                <span class="share-pst" title="Share">';
    postHTML += '                    <i>';
    postHTML += '                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share-2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>';
    postHTML += '                    </i>';
    postHTML += '                    <ins>205</ins>';
    postHTML += '                </span>';
    postHTML += '            </li>';
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
    postHTML += '    </div>';
    postHTML += '    <div class="box">';
    postHTML += '        <div class="Emojis">';
    postHTML += '            <div class="Emoji Emoji--like">';
    postHTML += '                <div class="icon icon--like"></div>';
    postHTML += '            </div>';
    postHTML += '            <div class="Emoji Emoji--love">';
    postHTML += '                <div class="icon icon--heart"></div>';
    postHTML += '            </div>';
    postHTML += '            <div class="Emoji Emoji--haha">';
    postHTML += '                <div class="icon icon--haha"></div>';
    postHTML += '            </div>';
    postHTML += '            <div class="Emoji Emoji--wow">';
    postHTML += '                <div class="icon icon--wow"></div>';
    postHTML += '            </div>';
    postHTML += '            <div class="Emoji Emoji--sad">';
    postHTML += '                <div class="icon icon--sad"></div>';
    postHTML += '            </div>';
    postHTML += '            <div class="Emoji Emoji--angry">';
    postHTML += '                <div class="icon icon--angry"></div>';
    postHTML += '            </div>';
    postHTML += '        </div>';
    postHTML += '    </div>';
    postHTML += '    <a title="" href="#" class="comment-to"><i class="icofont-comment"></i> Comment</a>';
    postHTML += '    <a title="" href="#" class="share-to"><i class="icofont-share-alt"></i> Share</a>';
    postHTML += '</div>';
    postHTML += '<div class="emoji-state">';
    postHTML += '    <div class="popover_wrapper">';
    postHTML += '        <a class="popover_title" href="#" title=""><img alt="" src="images/smiles/thumb.png"></a>';
    postHTML += '        <div class="popover_content">';
    postHTML += '            <span><img alt="" src="images/smiles/thumb.png"> Likes</span>';
    postHTML += '            <ul class="namelist">';
    postHTML += '                <li>Jhon Doe</li>';
    postHTML += '                <li>Amara Sin</li>';
    postHTML += '                <li>Sarah K.</li>';
    postHTML += '                <li><span>20+ more</span></li>';
    postHTML += '            </ul>';
    postHTML += '        </div>';
    postHTML += '    </div>';
    postHTML += '    <div class="popover_wrapper">';
    postHTML += '        <a class="popover_title" href="#" title=""><img alt="" src="images/smiles/heart.png"></a>';
    postHTML += '        <div class="popover_content">';
    postHTML += '            <span><img alt="" src="images/smiles/heart.png"> Love</span>';
    postHTML += '            <ul class="namelist">';
    postHTML += '                <li>Amara Sin</li>';
    postHTML += '                <li>Jhon Doe</li>';
    postHTML += '                <li><span>10+ more</span></li>';
    postHTML += '            </ul>';
    postHTML += '        </div>';
    postHTML += '    </div>';
    postHTML += '    <div class="popover_wrapper">';
    postHTML += '        <a class="popover_title" href="#" title=""><img alt="" src="images/smiles/smile.png"></a>';
    postHTML += '        <div class="popover_content">';
    postHTML += '            <span><img alt="" src="images/smiles/smile.png"> Happy</span>';
    postHTML += '            <ul class="namelist">';
    postHTML += '                <li>Sarah K.</li>';
    postHTML += '                <li>Jhon Doe</li>';
    postHTML += '                <li>Amara Sin</li>';
    postHTML += '                <li><span>100+ more</span></li>';
    postHTML += '            </ul>';
    postHTML += '        </div>';
    postHTML += '    </div>';
    postHTML += '    <div class="popover_wrapper">';
    postHTML += '        <a class="popover_title" href="#" title=""><img alt="" src="images/smiles/weep.png"></a>';
    postHTML += '        <div class="popover_content">';
    postHTML += '            <span><img alt="" src="images/smiles/weep.png"> Dislike</span>';
    postHTML += '            <ul class="namelist">';
    postHTML += '                <li>Danial Carbal</li>';
    postHTML += '                <li>Amara Sin</li>';
    postHTML += '                <li>Sarah K.</li>';
    postHTML += '                <li><span>15+ more</span></li>';
    postHTML += '            </ul>';
    postHTML += '        </div>';
    postHTML += '    </div>';
    postHTML += '    <p>30+</p>';
    postHTML += '</div>';
    postHTML += '<div class="new-comment" style="display: none;">';
    postHTML += '    <form method="post">';
    postHTML += '        <input type="text" placeholder="write comment">';
    postHTML += '        <button type="submit"><i class="icofont-paper-plane"></i></button>';
    postHTML += '    </form>';
    postHTML += '    <div class="comments-area">';
    postHTML += '        <ul>';
    postHTML += '            <li>';
    postHTML += '                <figure><img alt="" src="images/resources/user1.jpg"></figure>';
    postHTML += '                <div class="commenter">';
    postHTML += '                    <h5><a title="" href="#">Jack Carter</a></h5>';
    postHTML += '                    <span>2 hours ago</span>';
    postHTML += '                    <p>i think that some how, we learn who we really are and then live with that decision, great post!</p>';
    postHTML += '                    <span>you can view the more detail via link</span>';
    postHTML += '                    <a title="" href="#">https://www.youtube.com/watch?v=HpZgwHU1GcI</a>';
    postHTML += '                </div>';
    postHTML += '                <a title="Like" href="#"><i class="icofont-heart"></i></a>';
    postHTML += '                <a title="Reply" href="#" class="reply-coment"><i class="icofont-reply"></i></a>';
    postHTML += '            </li>';
    postHTML += '            <li>';
    postHTML += '                <figure><img alt="" src="images/resources/user2.jpg"></figure>';
    postHTML += '                <div class="commenter">';
    postHTML += '                    <h5><a title="" href="#">Ching xang</a></h5>';
    postHTML += '                    <span>2 hours ago</span>';
    postHTML += '                    <p>i think that some how, we learn who we really are and then live with that decision, great post!</p>';
    postHTML += '                </div>';
    postHTML += '                <a title="Like" href="#"><i class="icofont-heart"></i></a>';
    postHTML += '                <a title="Reply" href="#" class="reply-coment"><i class="icofont-reply"></i></a>';
    postHTML += '            </li>';
    postHTML += '        </ul>';
    postHTML += '    </div>';
    postHTML += '</div>';
    postHTML += '</div>';
    postHTML += '</div>';
    postHTML += '</div>';
    postHTML += '</div>';


    // Thêm HTML vào phần tử hiển thị
    outputElement.append(postHTML);
  });
}








