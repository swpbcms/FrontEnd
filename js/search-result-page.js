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
    url: 'https://localhost:7206/api/Post/search-postuser?search=chim',
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
    var outputElement = $('#search-result');

    // Kiểm tra nếu dữ liệu rỗng
    if (data.length === 0) {
        outputElement.text('Không có dữ liệu để hiển thị.');
        return;
    }

    // Duyệt qua từng đối tượng dữ liệu và hiển thị lên trang web 
    $.each(data, function (index, item) {
        var postTitle = item.postTitle;
        var postNumberLike = item.postNumberLike;
        var postNumberJoin = item.postNumberJoin;

        var postHTML = '<div class="dept-info">';
        postHTML += '<ul>';
        postHTML += '<li>'
        postHTML += '<h4>' + postTitle + '</h4>';
        postHTML += '<p> Number Like: ' + postNumberLike + '</p>';
        postHTML += '<p> Number Join: ' + postNumberJoin + '</p>';
        postHTML += '</li>';
        postHTML += '</ul>'

        // Thêm HTML vào phần tử hiển thị
        outputElement.append(postHTML);
    })
}

