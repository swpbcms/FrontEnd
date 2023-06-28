

$(document).ready(function() {
    // Xử lý sự kiện submit của biểu mẫu
    $("#loginForm").submit(function(event) {
      event.preventDefault(); // Ngăn chặn gửi yêu cầu mặc định
  
      // Lấy giá trị tên đăng nhập và mật khẩu từ người dùng
      var username = $("#memberUserNameInput").val();
      var password = $("#memberPasswordInput").val();
  
      // Tạo đối tượng chứa dữ liệu gửi đi
      var data = {
        memberUserName: username,
        memberPassword: password
      };
  
      // Gửi yêu cầu AJAX POST đến API
      $.ajax({
        url: "https://localhost:7206/api/Member/login-Member",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response) {
          // Xử lý phản hồi từ API
          if (response.data) {
            // Kiểm tra dữ liệu phản hồi nếu thành công
            var member = response.data;
            // Xử lý dữ liệu thành viên ở đây
            // Ví dụ: chuyển trang và lưu session đăng nhập

            window.location.href = "index.html";
            sessionStorage.setItem("loggedInMember", JSON.stringify(member));
          } else {
            // Xử lý khi đăng nhập không thành công
            console.log("Tên đăng nhập hoặc mật khẩu không đúng");
          }
        },
        error: function(error) {
          // Xử lý khi có lỗi xảy ra trong quá trình gửi yêu cầu
          console.log("Đã xảy ra lỗi: " + error);
        }
      });
    });
  });



