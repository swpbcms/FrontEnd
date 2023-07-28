import { getMembers, deleteMember } from "./services/member.service.js";

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
  // Fetch member list using API call from member.service.js
  getMembers()
    .then((response) => {
      if (response && response.data) {
        // Process the member list data and display it on the page
        var members = response.data;

        // Display member list
        displayMemberList(members);
      } else {
        console.log("Failed to fetch member list");
      }
    })
    .catch((error) => {
      console.log("An error occurred while fetching member list: " + error);
      console.log(error);
    });

  // Display member list
  function displayMemberList(members) {
    var memberListHTML = "<h2>Danh sách thành viên</h2>";
    memberListHTML += "<div class='table-responsive'><table class='uk-table uk-table-hover uk-table-divider'>";
    memberListHTML += "<thead><tr><th>ID</th><th>Tạo lúc</th><th>Giới tính</th><th>Ảnh</th><th>Họ và tên</th><th>Email</th><th>Ngày sinh</th><th>Trạng thái</th><th>Tên đăng nhập</th><th>Mật khẩu</th><th>Thao tác</th></tr></thead><tbody>";

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
      // Add the Delete Member button with the data attribute for member ID
      memberListHTML += "<td><button class='uk-button uk-button-small uk-button-danger delete-member-btn' data-member-id='" + member.memberId + "'>Delete</button></td>";
      memberListHTML += "</tr>";
    }

    memberListHTML += "</tbody></table></div>";

    $("#components-nav li:first-child").html(memberListHTML);

    // Add the "Delete Member" button event listener here
    // Add the "Delete Member" button event listener here
$(".delete-member-btn").on("click", function () {
  const memberId = $(this).data("member-id");
  const status = $(this).closest("tr").find("td:eq(7)").text().trim(); // Get the status from the table cell

  // Check if the member status is "Không hoạt động"
  if (status === "Không hoạt động") {
    alert("Member is already inactive and can't be deleted.");
    return;
  }

  // Show a confirmation dialog before proceeding with the deletion
  const confirmation = confirm("Are you sure you want to delete this member?");
  if (!confirmation) {
    // If the user cancels the deletion, do nothing
    return;
  }

  // Call the deleteMember function to delete the member
  deleteMember(memberId)
    .then(() => {
      // Do not remove the member from the list immediately.
      // You can choose to reload the member list to reflect the changes after successful deletion.
      // You can call getMembers() again here or simply remove the deleted row
      loadMembers(); // Assuming you have a function to reload the member list
    })
    .catch((error) => {
      console.error("Error deleting member: ", error);
      // Handle error if needed
    });
});

    
    function loadMembers() {
      getMembers()
        .then((response) => {
          if (response && response.data) {
            // Process the member list data and display it on the page
            var members = response.data;
    
            // Display member list
            displayMemberList(members);
          } else {
            console.log("Failed to fetch member list");
          }
        })
        .catch((error) => {
          console.log("An error occurred while fetching member list: " + error);
          console.log(error);
        });
    }
  }
})
