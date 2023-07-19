import { login } from "./services/member.service.js";
// let member = [];
// $(document).ready(function () {
//   $("#loginForm").submit(function (event) {
//     event.preventDefault();
//     sessionStorage.removeItem("loggedInMember");
//     var username = $("#userNameInput").val();
//     var password = $("#passwordInput").val();

//     window.addEventListener("DOMContentLoaded", async () => {
//       await login(username, password)
//         .then(function (response) {
//           if (response.data) {
//             var model = response.data;
//             window.location.href = "index.html";
//             sessionStorage.setItem("loggedInMember", JSON.stringify(model));
//           } else {
//             Swal.fire({
//               icon: 'error',
//               title: 'Đăng nhập thất bại',
//               text: 'Tên đăng nhập hoặc mật khẩu thành viên không đúng'
//             });
//           }
//         })
//         .catch(function (error) {
//           console.log("Đã xảy ra lỗi khi đăng nhập thành viên: " + error);
//         });
//     });
//   });
// });


$(document).ready(function() {
  // Xử lý sự kiện khi biểu mẫu được gửi đi
  $("#loginForm").submit(function(event) {
    event.preventDefault(); // Ngăn chặn việc gửi yêu cầu mặc định của biểu mẫu

    // Xóa thông tin đăng nhập cũ trong sessionStorage
    sessionStorage.removeItem("loggedInMember");

    // Lấy tên đăng nhập và mật khẩu từ người dùng
    var username = $("#userNameInput").val();
    var password = $("#passwordInput").val();

    // Tạo đối tượng dữ liệu cho quản lý
    var memberData = {
      memberUserName: username,
      memberPassword: password
    };

    // Gửi yêu cầu AJAX POST đến API đăng nhập cho quản lý
    $.ajax({
      url: "https://localhost:7206/api/Member/login-Member",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(memberData),
      success: function(response) {
        if (response.data) {
          // Xử lý đăng nhập quản lý thành công
          var member = response.data;
          window.location.href = "index.html";
          sessionStorage.setItem("loggedInMember", JSON.stringify(member));
        } else {
          // Xử lý khi tên đăng nhập hoặc mật khẩu quản lý không đúng
          Swal.fire({
            icon: 'error',
            title: 'Đăng nhập thất bại',
            text: 'Tên đăng nhập hoặc mật khẩu quản lý không đúng'
          });
        }
      },
      error: function(error) {
        // Xử lý khi có lỗi xảy ra trong quá trình gửi yêu cầu đăng nhập quản lý
        console.log("Đã xảy ra lỗi khi đăng nhập quản lý: " + error);
      }
    });
  });
});
