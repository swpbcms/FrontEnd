$(document).ready(function() {
    // Xử lý sự kiện submit của biểu mẫu
    $("#signup").submit(function(event) {
      event.preventDefault(); // Ngăn chặn gửi yêu cầu mặc định
  
      // Lấy giá trị tên đăng nhập và mật khẩu từ người dùng
      // Lấy giá trị từ các trường nhập liệu
      var memberId = $("#memberIdInput").val();
      var gender = $("input[name='gender']:checked").val();
      var image = ""; // Set the member image value here
      var fullName = $("#memberFullNameInput").val();
      var email = $("#memberEmailInput").val();
      var password = $("#memberPasswordInput").val();
      var dob = $("#memberDateOfBirthInput").val();
  
      // Tạo đối tượng chứa dữ liệu gửi đi
      var data = {
        memberId: memberId,
        memberGender: gender,
        memberImage: image,
        memberFullName: fullName,
        memberEmail: email,
        memberPassword: password,
        memberDob: dob
      };
  
      // Gửi yêu cầu AJAX PUT đến API
      $.ajax({
        url: "https://localhost:7206/api/Member/Update-member",
        type: "PUT",
        contentType: "application/json-patch+json",
        data: JSON.stringify(data),
        success: function(response) {
          // Xử lý phản hồi từ API
          console.log("Cập nhật thông tin thành viên thành công");
          // Thực hiện các hành động khác sau khi cập nhật thông tin thành viên thành công
        },
        error: function(error) {
          // Xử lý khi có lỗi xảy ra trong quá trình gửi yêu cầu
          console.log("Đã xảy ra lỗi khi cập nhật thông tin thành viên: " + error);
        }
      });
    });
  });
  