
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

// $(document).ready(function() {
//     var loggedInMember = sessionStorage.getItem("loggedInMember");
//     if (loggedInMember) {
//       var mem = JSON.parse(loggedInMember);

//       var memberId = mem.memberId;
//     //   var postId = mem.postId;

//       // Gửi AJAX request để lấy thông tin của member
//       $.ajax({
//         url: "https://localhost:7206/api/Member/ID-Member?id=Mem40080c3",
//         type: "GET",
//         data: { memberId: memberId },
//         success: function(memberResponse) {
//           // Xử lý và hiển thị thông tin của member
//           var memberFullName = memberResponse.fullName;
//           var memberImage = memberResponse.image;

//           $('#fullname1').html(memberFullName);
//           $('#member-image1').attr('src', memberImage);
//         },
//         error: function(xhr, status, error) {
//           // Xử lý lỗi nếu có
//         }
//       });
//     }
//   });




