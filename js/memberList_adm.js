import { getMembers, deleteMember } from "./services/member.service.js";

$(document).ready(function() {
    // Fetch member list using AJAX
    getMembers()
        .then((response) => {
            if (response && response.data) {
                // Process the member list data and display it on the page
                var members = response.data;
                // Display member list with delete buttons
                displayMemberList(members);
            } else {
                console.log("Failed to fetch member list");
            }
        })
        .catch((error) => {
            console.log("An error occurred while fetching member list: " + error);
            console.log(error);
        });
});

function displayMemberList(members) {
    var memberListHTML = "<h2>Danh sách thành viên</h2>";
    memberListHTML += "<div class='table-responsive'><table class='uk-table uk-table-hover uk-table-divider'>";
    memberListHTML += "<thead><tr><th>ID</th><th>Tạo lúc</th><th>Giới tính</th><th>Ảnh</th><th>Họ và tên</th><th>Email</th><th>Ngày sinh</th><th>Trạng thái</th><th>Tên đăng nhập</th><th>Mật khẩu</th><th>Thao tác</th></tr></thead><tbody>";

    for (var i = 0; i < members.length; i++) {
        var member = members[i];
        var gender = member.memberGender ? "Nam" : "Nữ";
        var status = member.memberStatus ? "Hoạt động" : "Không hoạt động";

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
    $(".delete-member-btn").on("click", function () {
        const memberId = $(this).data("member-id");
        // Call the deleteMember function to delete the member
        deleteMember(memberId)
            .then(() => {
                $(this).closest("tr").remove();
                // Reload the member list to reflect the changes after successful deletion
                // You can choose to call getMembers() again here or simply remove the deleted row
            })
            .catch((error) => {
                console.error("Error deleting member: ", error);
                // Handle error if needed
            });
    });
}
