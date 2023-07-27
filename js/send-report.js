import { createReport } from "./services/report.service.js";

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

  window.addEventListener('beforeunload', function (event) {
    // Delete sessionStorage
    sessionStorage.removeItem('reportedPostId');
    sessionStorage.removeItem('reportedButton');
});

