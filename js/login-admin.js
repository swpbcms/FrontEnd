// import { loginAdmin } from "./services/admin.service.js";

// $(document).ready(function() {
//   // Xử lý sự kiện khi biểu mẫu được gửi đi
//   $("#loginForm").submit(function(event) {
//     event.preventDefault(); // Ngăn chặn việc gửi yêu cầu mặc định của biểu mẫu

//     // Lấy tên đăng nhập và mật khẩu từ người dùng
//     var username = $("#userNameInput").val();
//     var password = $("#passwordInput").val();

//     // Gọi API đăng nhập cho admin
//     loginAdmin(username, password)
//       .then((data) => {
//         if (data) {
//           // Xử lý đăng nhập admin thành công
//           sessionStorage.setItem("loggedInAdmin", JSON.stringify(data));
//           window.location.href = "admin.html";
//         } else {
//           // Xử lý khi tên đăng nhập hoặc mật khẩu admin không đúng
//           Swal.fire({
//             icon: "error",
//             title: "Đăng nhập thất bại",
//             text: "Tên đăng nhập hoặc mật khẩu admin không đúng",
//           });
//         }
//       })
//       .catch((error) => {
//         // Xử lý khi có lỗi xảy ra trong quá trình gửi yêu cầu đăng nhập admin
//         console.log("Đã xảy ra lỗi khi đăng nhập admin: " + error);
//       });
//   });
// });
