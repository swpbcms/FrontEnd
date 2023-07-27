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

window.addEventListener('beforeunload', function (event) {
    // Delete sessionStorage
    sessionStorage.removeItem('reportedPostId');
});

// Fetch report types on page load
$(document).ready(function () {
    // getReportTypes().then(response => {
    //     if (response && response.data && Array.isArray(response.data)) {
    //         var reportTypeSelect = $('#reportTypeSelect');
    //         response.data.forEach(reportType => {
    //             var optionHTML = `<option value="${reportType.reportTypeId}">${reportType.reportTypeName}</option>`;
    //             reportTypeSelect.append(optionHTML);
    //         });
    //     } else {
    //         console.log('Unexpected response:', response);
    //     }
    // }).catch(error => {
    //     console.error('Error getting report types:', error);
    // });
});

// Handle form submission
$("form").on("submit", function (event) {
    event.preventDefault(); // prevent the browser's default action on form submit

    // Get values from form fields
    var reportTitle = $(this).find("input[type='text']").val();
    var reportDescription = $(this).find("textarea").val();
    var reportType = $("#reportTypeSelect").val();

    // Get values from sessionStorage
    var memberId = sessionStorage.getItem('loggedInMember');
    var posId = sessionStorage.getItem('reportedPostId');

    // Create a report object to send
    var report = {
        reportTitle: reportTitle,
        memberId: memberId,
        reportType: reportType,
        reportDescription: reportDescription,
        posId: posId
    };

    // Call the createReport API
    createReport(report).then((response) => {
        if (response.status == 200) { // assuming API responds with status code 200 on success
            alert("Report sent successfully!");
            // here, do what you want after a successful report (e.g., redirect to another page)
        } else {
            alert("Something went wrong!");
        }
    }).catch((error) => {
        console.log(error);
        alert("Something went wrong!");
    });
});

