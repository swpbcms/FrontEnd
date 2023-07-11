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

        var postHTML = '<div class="dept-info">';
        postHTML += '<ul>';
        postHTML += '<li>'
        postHTML += '<h4>' + postTitle + '</h4>';
        postHTML += '<p> Number Like: ' + postNumberLike + '</p>';
        postHTML += '<p> Number Join: ' + postNumberJoin + '</p>';
        postHTML += '</li>';
        postHTML += '</ul>'
        postHTML += '</div>';

        outputElement.append(postHTML);
    });
}
 $(document).ready(function() {
    var variable = localStorage.getItem('query');
    $('#searchquery').html(variable);
 })





