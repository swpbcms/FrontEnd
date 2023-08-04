
import {register} from "./services/manager.service.js";
$(document).ready(function() {
    // Xử lý sự kiện submit của biểu mẫu
    $("#signup").submit(function(event) {
      event.preventDefault(); // Ngăn chặn gửi yêu cầu mặc định
  
      // Lấy giá trị từ các trường nhập liệu
      var username = $("#memberUserNameInput").val();
      var phone = $("#memberPhone").val(); // Add the phone input element ID and get its value here
      var password = $("#memberPasswordInput").val();
      var confirmPassword = $("#memberConfirmPasswordInput").val();
      var imageUrl = "string"; // Set the image URL value here (if available)
      var fullName = $("#memberFullNameInput").val();
      var email = $("#memberEmailInput").val();
  
      // Perform client-side validation
      if (!username || !password || !confirmPassword || !phone || !fullName || !email || !imageUrl) {
        // Show validation error using Swal.fire
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please fill in all the required fields.",
        });
        return; // Stop form submission
      }
  
      // Validate password and confirm password match
      if (password !== confirmPassword) {
        // Show validation error using Swal.fire
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Password and Confirm Password do not match.",
        });
        return; // Stop form submission
      }
  
      // Validate email format
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        // Show validation error using Swal.fire
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please enter a valid email address.",
        });
        return; // Stop form submission
      }
  
    
  
      // Tạo đối tượng chứa dữ liệu gửi đi
      var data = {
        managerUserName: username,
        managerPhone: phone,
        managerPassword: password,
        managerImage: imageUrl,
        managerFullName: fullName,
        managerEmail: email,
      };
  
      // Gửi yêu cầu AJAX POST đến API
      register(data)
        .then((response) => {
          // Xử lý phản hồi từ API
          if (response.data) {
            // Xử lý khi đăng ký thành công
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Đăng ký thành công",
            }).then(() => {
              window.location.href = "sign-in.html"; // Chuyển đến trang đăng nhập sau khi đăng ký thành công
            });
          } else {
            // Xử lý khi đăng ký không thành công
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Đăng ký không thành công",
            });
          }
        })
        .catch((error) => {
          // Xử lý khi có lỗi xảy ra trong quá trình gửi yêu cầu
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Đã xảy ra lỗi: " + error,
          });
        });
    });
  });
  