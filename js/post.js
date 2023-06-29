$(document).ready(function() {{
      // Gửi yêu cầu AJAX để lấy dữ liệu thành viên từ API
      $.ajax({
        url: "https://localhost:7206/api/Member/ID-Member?id=Mem40080c3",
        type: "GET",
        data: { memberId: memberId },
        success: function(response) {
          // Xử lý và hiển thị dữ liệu thành viên
          var memberFullName = response.fullName;
          var memberImage = response.image;
          var memberEmail = response.email;
  
          // Đặt giá trị vào các phần tử HTML tương ứng
          $('#member-image').attr('src', memberImage);
          $('#member-fullname').text(memberFullName);
          $('#member-email').text('Email: ' + memberEmail);
        },
        error: function(xhr, status, error) {
          // Xử lý lỗi nếu có
        }
      });
    }
  });
  