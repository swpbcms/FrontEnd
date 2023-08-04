import { getMembers, deleteMember } from "./services/member.service.js";
import { moderateMem } from "./services/manager.service.js";

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

$(document).ready(function () {
  // Fetch member list using API call from member.service.js
  getMembers()
    .then((response) => {
      if (response) {
        // Process the member list data and display it on the page
        var members = response;

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

    function formatDate(dateString) {
      var date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

  // Display member list
  function displayMemberList(members) {
    var memberListHTML = "<h2>Danh sách thành viên</h2>";
    memberListHTML += "<div class='table-responsive'><table class='uk-table uk-table-hover uk-table-divider'>";
    memberListHTML += "<thead><tr><th>ID</th><th>Tạo lúc</th><th>Giới tính</th><th>Ảnh</th><th>Họ và tên</th><th>Email</th><th>Ngày sinh</th><th>Trạng thái</th><th>Tên đăng nhập</th><th>Số lượng chim</th><th>Thao tác</th></tr></thead><tbody>";

    for (var i = 0; i < members.length; i++) {
      var member = members[i];
      var gender = member.memberGender ? "Nam" : "Nữ";
      var status = member.memberStatus === "active" ? "Hoạt động" : "Không hoạt động";

      memberListHTML += "<tr>";
      memberListHTML += "<td>" + member.memberId + "</td>";
      memberListHTML += "<td>" + formatDate(member.memberCreateAt) + "</td>";
      memberListHTML += "<td>" + gender + "</td>";
      memberListHTML += "<td><img src='" + member.memberImage + "' alt='Avatar' class='member-image' /></td>";
      memberListHTML += "<td>" + member.memberFullName + "</td>";
      memberListHTML += "<td>" + member.memberEmail + "</td>";
      memberListHTML += "<td>" + formatDate(member.memberDob) + "</td>";
      memberListHTML += "<td>" + status + "</td>";
      memberListHTML += "<td>" + member.memberUserName + "</td>";
      memberListHTML += "<td>" + member.numberOfBird + "</td>";

      // Add the Delete Member button with the data attribute for member ID
      memberListHTML += `<td>
      <div class="member-btn-group">
        <button class="uk-button uk-button-small uk-button-danger delete-member-btn" data-member-id="${member.memberId}">Delete</button>
      </div>
      <div class="member-btn-group">
        <button class="uk-button uk-button-small uk-button-primary moderate-member-btn" data-member-id="${member.memberId}">Moderate</button>
      </div>
    </td>`;

      memberListHTML += "</tr>";
    }

    memberListHTML += "</tbody></table></div>";

    $("#components-nav li:first-child").html(memberListHTML);

    // Add the "Delete Member" button event listener here
    $(".delete-member-btn").on("click", function () {
      const memberId = $(this).data("member-id");
      const status = $(this).closest("tr").find("td:eq(7)").text().trim();

      if (status === "Không hoạt động") {
        // Using Swal.fire instead of alert
        Swal.fire({
          title: 'Error',
          text: "Member is already inactive and can't be deleted.",
          icon: 'error',
          confirmButtonText: 'OK',
        });
        return;
      }

      // Show a confirmation dialog before proceeding with the deletion
      Swal.fire({
        title: 'Confirmation',
        text: 'Are you sure you want to delete this member?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          // Call the deleteMember function to delete the member
          deleteMember(memberId)
            .then(() => {
              // Reload the member list after successful deletion
              loadMembers();
            })
            .catch((error) => {
              console.error("Error deleting member: ", error);
              // Handle error if needed
            });
        }
      });
    });

    $(".moderate-member-btn").on("click", function () {
      const memberId = $(this).data("member-id");

      // Show a confirmation dialog before proceeding with the moderation
      Swal.fire({
        title: 'Confirmation',
        text: 'Are you sure you want to moderate this member?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Moderate',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          // Call the moderateMem function to moderate the member
          moderateMem(memberId)
            .then(() => {
              // Reload the member list after successful moderation
              loadMembers();
            })
            .catch((error) => {
              console.error("Error moderating member: ", error);
              // Handle error if needed
            });
        }
      });
    });
  }

  function loadMembers() {
    getMembers()
      .then((response) => {
        if (response) {
          // Process the member list data and display it on the page
          var members = response;

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
});
