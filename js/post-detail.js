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
                // Hiển thị thông tin chi tiết của event lên trang event-detail.html
                displayPostDetail(response.data);
                displayComments(response.data.comment);
            } else {
                console.log("Không có dữ liệu hoặc dữ liệu không hợp lệ từ API.");
            }
        },
        error: function () {
            console.log("Lỗi khi gọi API.");
        },
    });
});


function displayPostDetail(postDetail) {
    // Hiển thị thông tin của event lên trang event-detail.html
    var postTitle = postDetail.postTitle;
    var postDescription = postDetail.postDescription;
    var postCreate = postDetail.postCreateAt;
    var postImage = postDetail.media && postDetail.media.length > 0 ? postDetail.media[0].linkMedia : "";


    var formattedDate = new Date(postCreate).toLocaleString("en-US", {
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
    $(".post-titleDetail").text(postTitle);
    $(".post-detail p").text(postDescription);
    $(".post-detail h4").text(formattedDate);
    // Set ảnh của event
    $(".post-detail img").attr("src", postImage);

}

function displayComments(comments) {
    var commentsContainer = $(".comment-box");  // Sửa đường dẫn cho phù hợp với trang của bạn
    commentsContainer.empty(); // Xóa các comment cũ

    $.each(comments, function(index, commentData) {
        var commentContent = commentData.commentContent;
        var memberFullName = commentData.member.memberFullName;
        var memberImage = commentData.member.memberImage;
        var commentTime = commentData.dateTime;

        // Chuyển đổi commentTime thành định dạng ngày giờ dễ đọc
        var formattedCommentTime = new Date(commentTime).toLocaleString("en-US", {
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

        // Tạo comment HTML
      // Tạo comment HTML
var commentHTML = '<li>';
commentHTML += '<div class="comment-box">';
commentHTML += '<div class="commenter-photo">';
commentHTML += '<img alt="" src="' + memberImage + '">';
commentHTML += '</div>';
commentHTML += '<div class="commenter-meta">';
commentHTML += '<div class="comment-titles">';
commentHTML += '<h6>' + memberFullName + '</h6>';
commentHTML += '<span>' + formattedCommentTime + '</span>';
commentHTML += '<a title="" href="#" class="reply">Reply</a>';
commentHTML += '</div>';
commentHTML += '<p>' + commentContent + '</p>';
commentHTML += '</div>';
commentHTML += '</div>';
commentHTML += '<ul class="reply-form" style="display: none;"><li><form><textarea placeholder="Your reply"></textarea><button type="submit">Submit</button></form></li></ul>'; // Add reply form
commentHTML += '</li>';


        // Thêm comment mới vào container
        commentsContainer.append(commentHTML);
    });
}

$(document).on("click", ".reply", function(e) {
    e.preventDefault(); // Stop the link from redirecting
    $(this).closest('.comment-box').find('.reply-form').slideToggle(); // Show or hide the reply form
});
