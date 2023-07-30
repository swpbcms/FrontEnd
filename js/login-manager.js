$(document).ready(function() {
    // Xử lý sự kiện khi biểu mẫu được gửi đi
    $("#loginForm").submit(function(event) {
      event.preventDefault(); // Ngăn chặn việc gửi yêu cầu mặc định của biểu mẫu
  
      // Xóa thông tin đăng nhập cũ trong sessionStorage
      sessionStorage.removeItem("loggedInManager");
  
      // Lấy tên đăng nhập và mật khẩu từ người dùng
      var username = $("#userNameInput").val();
      var password = $("#passwordInput").val();
  
      // Tạo đối tượng dữ liệu cho quản lý
      var managerData = {
        managerUserName: username,
        managerPassword: password
      };
  
      // Gửi yêu cầu AJAX POST đến API đăng nhập cho quản lý
      $.ajax({
        url: "https://localhost:7206/api/Manager/login-Manager",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(managerData),
        success: function(response) {
          if (response.data) {
            // Xử lý đăng nhập quản lý thành công
            var manager = response.data;
            window.location.href = "manager.html";
            sessionStorage.setItem("loggedInManager", JSON.stringify(manager));
          } else {
            // Xử lý khi tên đăng nhập hoặc mật khẩu quản lý không đúng
            Swal.fire({
              icon: 'error',
              title: 'Đăng nhập thất bại',
              text: 'Tên đăng nhập hoặc mật khẩu không đúng'
            });
          }
        },
        error: function(error) {
          // Xử lý khi có lỗi xảy ra trong quá trình gửi yêu cầu đăng nhập quản lý
          console.log("Đã xảy ra lỗi khi đăng nhập: " + error);
        }
      });
    });
  });
  