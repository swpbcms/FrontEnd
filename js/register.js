$(document).ready(function() {
  // Xử lý sự kiện submit của biểu mẫu
  $("#signup").submit(function(event) {
    event.preventDefault(); // Ngăn chặn gửi yêu cầu mặc định

    // Lấy giá trị tên đăng nhập và mật khẩu từ người dùng
    // Lấy giá trị từ các trường nhập liệu
    var username = $("#memberUserNameInput").val();
    var password = $("#memberPasswordInput").val();
    var  confirmPassword = $("#memberConfirmPasswordInput").val();
    var gender = $("input[name='gender']:checked").val();
    var image = ""; // Set the member image value here
    var fullName = $("#memberFullNameInput").val();
    var email = $("#memberEmailInput").val();
    var dob = $("#memberDateOfBirthInput").val();

    // Perform client-side validation
    if (!username || !password || !gender || !fullName || !email || !dob) {
      // Show validation error using Swal.fire
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all the required fields.",
      });
      return; // Stop form submission
    }

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
      memberUserName: username,
      memberPassword: password,
      memberGender: gender,
      memberImage: image,
      memberFullName: fullName,
      memberEmail: email,
      memberDob: dob,
    };

    // Gửi yêu cầu AJAX POST đến API
    $.ajax({
      url: "https://localhost:7206/api/Member/Register-Member",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function(response) {
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
      },
      error: function(error) {
        // Xử lý khi có lỗi xảy ra trong quá trình gửi yêu cầu
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Đã xảy ra lỗi: " + error,
        });
      },
    });
  });
});