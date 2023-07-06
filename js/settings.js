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

  // Xử lý sự kiện click nút xóa tài khoản
  $("#deleteAccountButton").click(function(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit

    // Hiển thị thông báo xác nhận xóa tài khoản
    Swal.fire({
      title: "Xóa tài khoản",
      text: "Bạn có chắc chắn muốn xóa tài khoản?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy"
    }).then(function(result) {
      if (result.isConfirmed) {
        // Lấy ID từ session
        var loggedInMember = sessionStorage.getItem("loggedInMember");
        if (loggedInMember) {
          var mem = JSON.parse(loggedInMember);
          var memberId = mem.memberId;

          // Gửi yêu cầu DELETE đến API
          deleteAccount(memberId);
        } else {
          console.log("Người dùng chưa đăng nhập");
        }
      }
    });
  });

  // Hàm xóa tài khoản
  function deleteAccount(memberId) {
    // Gửi yêu cầu DELETE đến API
    $.ajax({
      url: "https://localhost:7206/api/Member/Delete-member?id=" + memberId,
      type: "DELETE",
      headers: {
        "accept": "*/*"
      },
      success: function(response) {
        // Xử lý phản hồi từ API
        if (response.data) {
          // Hiển thị thông báo xóa thành công (nếu cần)
          Swal.fire({
            icon: "success",
            title: "Xóa tài khoản thành công",
            showConfirmButton: false,
            timer: 1500
          }).then(function() {
            // Chuyển hướng đến trang khác (nếu cần)
            window.location.href = "feed.html";
          });
        } else {
          console.log("Xóa tài khoản không thành công");
        }
      },
      error: function(error) {
        console.log("Đã xảy ra lỗi khi xóa tài khoản: " + error);
        console.log(error);
      }
    });
  }
});
