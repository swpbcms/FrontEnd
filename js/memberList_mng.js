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
      memberListHTML += "<td><button class='btn-update' data-member-id='" + member.memberId + "'>Update</button></td>";
      memberListHTML += "<td><button class='btn-delete' data-member-id='" + member.memberId + "'>Delete</button></td>";
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
  
  // Add event listener for update buttons
$(document).on("click", ".btn-update", function() {
  var memberId = $(this).data("member-id");

  // Perform the update action for the selected member
  updateMember(memberId);
});

// Add event listener for delete buttons
$(document).on("click", ".btn-delete", function() {
  var memberId = $(this).data("member-id");

  // Perform the delete action for the selected member
  deleteMember(memberId);
});
  
function updateMember(memberId) {
  // Perform the update action for the selected member with the given memberId
  // You can use AJAX to send a request to the server to update the member data
  // Example AJAX request:
  $.ajax({
    url: "https://localhost:7206/api/Member/Update-Member/" + memberId,
    type: "PUT",
    dataType: "json",
    success: function(response) {
      // Handle the update success
      console.log("Member updated successfully");
    },
    error: function(error) {
      // Handle the update error
      console.log("An error occurred while updating member: " + error);
    }
  });
}

function deleteMember(memberId) {
  // Perform the delete action for the selected member with the given memberId
  // You can use AJAX to send a request to the server to delete the member
  // Example AJAX request:
  $.ajax({
    url: "https://localhost:7206/api/Member/Delete-Member/" + memberId,
    type: "DELETE",
    dataType: "json",
    success: function(response) {
      // Handle the delete success
      console.log("Member deleted successfully");
    },
    error: function(error) {
      // Handle the delete error
      console.log("An error occurred while deleting member: " + error);
    }
  });
}

});
