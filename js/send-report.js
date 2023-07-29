import { createReport } from "./services/report.service.js";
import { getReportTypes } from "./services/report-type.service.js";


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
        window.location.href = "sign-in.html";
    });
});



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
  
        // Assuming that 'model' is your data object
        var model = {
          reportTitle: reportTitle,
          memberId: memberId,
          reportType: reportType,
          reportDescription: reportDescription,
          posId: postId,
        };
  
        $.ajax({
          url: "https://localhost:7206/api/Report/create-report",
          type: "POST",
          data: JSON.stringify(model),
          contentType: "application/json",
          success: function (data, textStatus, jqXHR) {
            if (data) {
              // Report sent successfully
              $("#messageBox").text("Report sent successfully!").show();
  
              // Clear input fields
              $("#reportTitleInput").val("");
              $("#reportDescriptionInput").val("");
              $("#reportTypeSelect").val(""); // only works if there's an option with value '', otherwise, use .prop('selectedIndex', 0)
  
              // Remove the 'reportedPostId' from sessionStorage
              sessionStorage.removeItem("reportedPostId");
            } else {
              // Something went wrong with the report submission
              $("#messageBox").text("Something went wrong!").show();
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            // Error occurred during report submission
            $("#messageBox").text("Something went wrong!").show();
          },
        });
      }
    });
  });
  

