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

import { getCommentsByPost } from "./services/comment.service.js";
$(document).ready(function() {
    try {
        // Gọi API để lấy danh sách comment
        const response = getCommentsByPost(postId).then;
        const comments = response.data;

        // Xóa tất cả comment cũ
        $(".comment-box").remove();

        // Duyệt qua từng comment và hiển thị lên trang
        comments.forEach(function (comment) {
            const { commentContent, dateTime } = comment;
            const { memberFullName, memberImage } = comment.member;

            // Tạo một comment box mới
            const commentBox = $("<div>").addClass("comment-box");

            // Tạo phần thông tin của người comment
            const commenterPhoto = $("<div>").addClass("commenter-photo")
                                              .append($("<img>").attr("src", memberImage));
            const commenterMeta = $("<div>").addClass("commenter-meta");
            const commentTitles = $("<div>").addClass("comment-titles")
                                             .append($("<h6>").text(memberFullName))
                                             .append($("<span>").text(dateTime))
                                             .append($("<a>").attr("href", "#").addClass("reply").text("reply"));
            const commentContentElement = $("<p>").text(commentContent);

            commenterMeta.append(commentTitles)
                         .append(commentContentElement);

            // Thêm thông tin vào comment box
            commentBox.append(commenterPhoto)
                      .append(commenterMeta);

            // Thêm comment box vào trang
            $(".comment-container").append(commentBox);  // replace ".comment-container" with the actual class or id of your comment container
        });
    } catch (error) {
        console.error("Error when fetching comments: ", error);
    }
})
