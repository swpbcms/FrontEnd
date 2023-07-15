$(document).ready(function () {
  var loggedInManager = sessionStorage.getItem("loggedInManager");
  if (loggedInManager) {
    var manager = JSON.parse(loggedInManager);

    var managerFullName = manager.managerFullName;
    var managerImage = manager.managerImage;
    $('#fullname').html(managerFullName);
    $('#image').attr('src', managerImage);
  }
});


$(document).ready(function () {
  $("#logoutButton").click(function () {
    // Clear the session storage
    sessionStorage.removeItem("loggedInMember");
    // Redirect to the login page or perform any other desired action
    window.location.href = "feed.html";
  });
});

$(document).ready(function() {
  // Fetch member list using AJAX
  $.ajax({
    url: "https://localhost:7206/api/Member/All-Member",
    type: "GET",
    dataType: "json",
    success: function(response) {
      // Handle API response
      if (response && response.data) {
        // Process the member list data and display it on the page
        var members = response.data;

        // Display member list
        displayMemberList(members);
      } else {
        console.log("Failed to fetch member list");
      }
    },
    error: function(error) {
      console.log("An error occurred while fetching member list: " + error);
      console.log(error);
    }
  });

  // Display member list
  function displayMemberList(members) {
    var memberListHTML = "<h2>Danh sách thành viên</h2>";
    memberListHTML += "<div class='table-responsive'><table class='uk-table uk-table-hover uk-table-divider'>";
    memberListHTML += "<thead><tr><th>ID</th><th>Tạo lúc</th><th>Giới tính</th><th>Ảnh</th><th>Họ và tên</th><th>Email</th><th>Ngày sinh</th><th>Trạng thái</th><th>Tên đăng nhập</th><th>Mật khẩu</th></tr></thead><tbody>";
    
    for (var i = 0; i < members.length; i++) {
      var member = members[i];
      var gender = member.memberGender ? "Nam" : "Nữ";
      var status = member.memberrStatus ? "Hoạt động" : "Không hoạt động";
      
      memberListHTML += "<tr>";
      memberListHTML += "<td>" + member.memberId + "</td>";
      memberListHTML += "<td>" + member.memberCreateAt + "</td>";
      memberListHTML += "<td>" + gender + "</td>";
      memberListHTML += "<td><img src='" + member.memberImage + "' alt='Avatar' class='member-image' /></td>";
      memberListHTML += "<td>" + member.memberFullName + "</td>";
      memberListHTML += "<td>" + member.memberEmail + "</td>";
      memberListHTML += "<td>" + member.memberDob + "</td>";
      memberListHTML += "<td>" + status + "</td>";
      memberListHTML += "<td>" + member.memberUserName + "</td>";
      memberListHTML += "<td>" + member.memberPassword + "</td>";
      memberListHTML += "</tr>";
    }
    
    memberListHTML += "</tbody></table></div>";
    
    $("#components-nav li:first-child").html(memberListHTML);
  }
  
  
  
});
