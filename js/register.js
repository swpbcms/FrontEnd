$(document).ready(function() {
  // Xử lý sự kiện submit của biểu mẫu
  $("#signup").submit(function(event) {
    event.preventDefault(); // Ngăn chặn gửi yêu cầu mặc định

    // Lấy giá trị tên đăng nhập và mật khẩu từ người dùng
    // Lấy giá trị từ các trường nhập liệu
    var username = $("#memberUserNameInput").val();
    var password = $("#memberPasswordInput").val();
    var confirmPassword = $("#memberConfirmPasswordInput").val();
    var gender = $("input[name='gender']:checked").val();
    var fullName = $("#memberFullNameInput").val();
    var email = $("#memberEmailInput").val();
    var dob = $("#memberDateOfBirthInput").val();

    // Validate all fields are filled
    if (!username || !password || !confirmPassword || !gender || !fullName || !email || !dob) {
      // Show validation error using Swal.fire
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all the required fields.",
      });
      return; // Stop form submission
    }

    // Check if Password and Confirm Password match
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

    // Validate avatar upload
    var avatarInput = $("#avatarInput")[0];
    var avatarFile = avatarInput.files[0]; // Get the first selected file
    var image = ""; // Set the member image value here

    if (!avatarFile) {
      // Show validation error using Swal.fire
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please select an avatar image.",
      });
      return; // Stop form submission
    }

    // Read the selected image file using FileReader API
    var reader = new FileReader();

    reader.onload = function(event) {
      // Base64-encoded image data
      image = event.target.result;

      // Continue with form submission after reading the image
      submitForm(username, password, confirmPassword, gender, image, fullName, email, dob);
    };

    reader.onerror = function() {
      // Show error if image reading fails
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to read the selected image file.",
      });
    };

    // Read the image file as data URL (Base64)
    reader.readAsDataURL(avatarFile);
  });
});

function submitForm(username, password, confirmPassword, gender, image, fullName, email, dob) {
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

  // Validate username and email existence
  validateUsernameAndEmail(username, email, function(errors) {
    if (Object.keys(errors).length > 0) {
      // Show validation errors using Swal.fire
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        html: Object.values(errors).join("<br>"),
      });
    } else {
      // Proceed with form submission

      // Tạo đối tượng chứa dữ liệu gửi đi
      var data = {
        memberUserName: username,
        memberPassword: password,
        memberGender: gender,
        memberImage: image,
        memberFullName: fullName,
        memberEmail: email,
        memberDob: dob,
        memberStatus: "pending", // New field to indicate pending approval
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
              text: "Đăng ký thành công. Vui lòng chờ quản lý duyệt tài khoản.",
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
      });
    }
  });
}

function validateUsernameAndEmail(username, email, callback) {
  $.ajax({
    url: "https://localhost:7206/api/Member/All-Member",
    type: "GET",
    contentType: "application/json",
    success: function(response) {
      var usernames = response.data.map(function(member) {
        return member.memberUserName;
      });
      var emails = response.data.map(function(member) {
        return member.memberEmail;
      });

      var errors = {};

      if (usernames.includes(username)) {
        errors.username = "Username already exists.";
      }

      if (emails.includes(email)) {
        errors.email = "Email already exists.";
      }

      callback(errors);
    },
    error: function(error) {
      callback({ apiError: "Failed to check username and email existence in the API." });
    },
  });
}
