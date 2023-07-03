$(document).ready(function() {
  // Xử lý sự kiện submit của biểu mẫu
  $("#signup").submit(function(event) {
    event.preventDefault(); // Ngăn chặn gửi yêu cầu mặc định

    // Lấy giá trị từ các trường nhập liệu
    var gender = $("input[name='gender']:checked").val();
    var image = ""; // Set the member image value here
    var fullName = $("#FullNameInput input").val();
    var email = $("#EmailInput input").val();
    var password = $("#PasswordInput input").val();
    var dob = $("#DateOfBirthInput input").val();

    // Lấy memberId từ sessionStorage
    var loggedInMember = sessionStorage.getItem("loggedInMember");
    if (loggedInMember) {
      var mem = JSON.parse(loggedInMember);
      var memid = mem.memberId;
      // Thêm memberId vào đối tượng data
      var data = {
        memberId: memid,
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
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response) {
          // Xử lý phản hồi từ API
          if (response.data) {
            // Hiển thị thông báo cập nhật thành công
            Swal.fire({
              icon: "success",
              title: "Cập nhật thành công",
              showConfirmButton: false,
              timer: 1500
            }).then(function() {
              location.reload(); // Load lại trang
            });
          } else {
            console.log("Thay đổi không thành công");
          }
        },
        error: function(error) {
          console.log("Đã xảy ra lỗi khi cập nhật thông tin thành viên: " + error);
          console.log(error);
        }
      });
    }
  });
});
