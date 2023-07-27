$(document).ready(function () {
    var loggedInMember = sessionStorage.getItem("loggedInMember");
    if (loggedInMember) {
        var mem = JSON.parse(loggedInMember);

        var memberFullName = mem.memberFullName;
        var memberImage = mem.memberImage;
        $("#fullname").html(memberFullName);
        $("#image").attr("src", memberImage);
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
import { createReport } from "./services/report.service.js";
import { getReportTypes } from "./services/report-type.service.js";

// Handle form submission
$(document).ready(function () {
  // Xử lý sự kiện khi biểu mẫu được gửi đi
  $("#reportForm").submit(function (event) {
    event.preventDefault(); // prevent the browser's default action on form submit

    // Get values from form fields
    var reportTitle = $("#reportTitleInput").val();
    var reportDescription = $("#reportDescriptionInput").val();
    var reportType = $("#reportTypeSelect option:selected").val(); // get reportTypeId from select box

    // Get values from sessionStorage
    var loggedInMember = sessionStorage.getItem("loggedInMember");
    if (loggedInMember) {
      var mem = JSON.parse(loggedInMember);
      var memberId = mem.memberId;
      var postId = sessionStorage.getItem("reportedPostId");

      // Create a report object to send
      var report = {
        reportTitle: reportTitle,
        memberId: memberId,
        reportType: reportType, // use reportTypeId here
        reportDescription: reportDescription,
        posId: postId,
      };

      // Call the createReport API
      createReport(report)
        .then((response) => {
          if (response.status === 200) {
            alert("Report sent successfully!");
            // here, do what you want after a successful report (e.g., redirect to another page)
          } else {
            alert("Something went wrong!");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Something went wrong!");
        });
    }
  });
});

