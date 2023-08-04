
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


var myVariable = localStorage.getItem('myVariable');

$.ajax({
    url: myVariable,
    method: 'GET',
    success: function (response) {
        if (response && response.data) {
            displayData(response.data);
        } else {
            console.log('Không có dữ liệu hoặc dữ liệu không hợp lệ từ API.');
        }
    },
    error: function () {
        console.log('Lỗi khi gọi API.');
    }
});

function displayData(data) {
    var outputElement = $('#search-result');
    outputElement.empty();

    if (data.length === 0) {
        outputElement.text('Không có dữ liệu để hiển thị.');
        return;
    }

    $.each(data, function (index, item) {
        var postTitle = item.postTitle;
        var postNumberLike = item.postNumberLike;
        var postNumberJoin = item.postNumberJoin;
        var postId = item.postId;
        var postStatus = item.postStatus;
    
        if (postStatus === 'Thành công') { // Add this line
            var postHTML = '<div class="dept-info">';
            postHTML += '<ul>';
            postHTML += '<li>'
            postHTML += '<h4 class="postDetail" data-id="' + postId + '">' + postTitle + '</h4>';
            postHTML += '<p> Number Like: ' + postNumberLike + '</p>';
            postHTML += '<p> Number Join: ' + postNumberJoin + '</p>';
            postHTML += '</li>';
            postHTML += '</ul>'
            postHTML += '</div>';
    
            outputElement.append(postHTML);
        }
    });
    

    $('.postDetail').on('click', function () {
        var postId = $(this).data('id');
        window.location.href = 'post-detail.html?postId=' + postId;
    });
}


$(document).ready(function () {
    var variable = localStorage.getItem('query');
    $('#searchquery').html(variable);
})

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



