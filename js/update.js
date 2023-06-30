$(document).ready(function() {

  // Lấy memberId từ sessionStorage
  var memid;
  var loggedInMember = sessionStorage.getItem("loggedInMember");
    if (loggedInMember) {
        var mem = JSON.parse(loggedInMember);

        memid = mem.memberId;
        $('#memberIdInput').html(memid);

    }
  
  // Xử lý sự kiện submit của biểu mẫu
  $("#signup").submit(function(event) {
    event.preventDefault(); // Ngăn chặn gửi yêu cầu mặc định

    // Lấy giá trị từ các trường nhập liệu
    var id = $("#memberIdInput").val();
    var gender = $("input[name='genderupdate']:checked").val();
    var image = ""; // Set the member image value here
    var fullName = $("#FullNameInput").val();
    var email = $("#EmailInput").val();
    var password = $("#PasswordInput").val();
    var dob = $("#DateOfBirthInput").val();

    // Tạo đối tượng chứa dữ liệu gửi đi
    var data = {
      memberId: id,
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
        } else {
          // Xử lý khi đăng ký không thành công
          console.log("thay đổi không thành công");
        }
      },
      error: function(error) {
        // Xử lý khi có lỗi xảy ra trong quá trình gửi yêu cầu
        console.log("Đã xảy ra lỗi khi cập nhật thông tin thành viên: " + error);
      }
    });
  });
});
