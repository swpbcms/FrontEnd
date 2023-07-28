import { moderateReportAdm} from "./services/report.service.js";

$(document).ready(function() {
  loadReportList();
});

function loadReportList() {
  $.ajax({
    url: 'https://localhost:7206/api/Report/All-report',
    type: 'GET',
    dataType: 'json',
    success: function(response) {
      // Handle API response
      if (response && response.data) {
        // Process the report list data and display it on the page
        var reports = response.data;

        // Fetch report types
        fetchReportTypes(reports);
      } else {
        console.log('Failed to fetch report list');
      }
    },
    error: function(error) {
      console.log('An error occurred while fetching report list: ' + error);
    }
  });
}

function fetchReportTypes(reports) {
  $.ajax({
    url: 'https://localhost:7206/api/ReportType/All-type',
    type: 'GET',
    dataType: 'json',
    success: function(response) {
      // Handle API response
      if (response && response.data) {
        // Process the report type data
        var reportTypes = {};

        // Create a map of report type IDs to report type names
        for (var i = 0; i < response.data.length; i++) {
          var reportType = response.data[i];
          reportTypes[reportType.reportTypeId] = reportType.reportTypeName;
        }

        // Display report list with report type names
        displayReportList(reports, reportTypes);
      } else {
        console.log('Failed to fetch report types');
      }
    },
    error: function(error) {
      console.log('An error occurred while fetching report types: ' + error);
    }
  });
}

function displayReportList(reports, reportTypes) {
  var reportListHTML = "<h2>Quản lý các đơn báo cáo</h2>";
  reportListHTML += "<div class='table-responsive'><table class='uk-table uk-table-hover uk-table-divider'>";
  reportListHTML += "<thead><tr><th>ID</th><th>Tiêu đề</th><th>ID Quản lý</th><th>ID Thành viên</th><th>Loại đơn</th><th>Trạng thái</th><th>Mô tả</th><th>Thời gian</th><th>Trả lời</th><th>Thao tác</th></tr></thead><tbody>";

  for (var i = 0; i < reports.length; i++) {
    var report = reports[i];
    var status = report.reportStatus ? 'Đã xử lý' : 'Chưa xử lý';
    var type = reportTypes[report.reportType];

    reportListHTML += "<tr>";
    reportListHTML += "<td>" + report.reportId + "</td>";
    reportListHTML += "<td>" + report.reportTitle + "</td>";
    reportListHTML += "<td>" + report.managerId + "</td>";
    reportListHTML += "<td>" + report.memberId + "</td>";
    reportListHTML += "<td>" + type + "</td>";
    reportListHTML += "<td>" + status + "</td>";
    reportListHTML += "<td>" + report.reportDescription + "</td>";
    reportListHTML += "<td>" + report.dateTime + "</td>";
    reportListHTML += "<td>" + report.reply + "</td>";
    reportListHTML += "<td>";
    reportListHTML += "<button class='uk-button uk-button-small uk-button-primary moderate-report-btn' data-report-id='" + report.reportId + "'>Moderate</button>";
    reportListHTML += "</td>";
    reportListHTML += "</tr>";
  }

  reportListHTML += "</tbody></table></div>";

  $("#components-nav li:nth-child(3)").html(reportListHTML);

  // Add the "Moderate" button event listener here
  $(".moderate-report-btn").on("click", function () {
    const reportId = $(this).data("report-id");

    // Show a prompt for the moderator to enter a reply
    Swal.fire({
      title: 'Enter Reply',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Moderate',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to enter a reply to moderate the report!'
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const Reply = result.value;

        // Call the moderateReportAdm function to moderate the report
        moderateReportAdm(reportId, Reply)
          .then(() => {
            // Reload the report list to reflect the changes after successful moderation
            loadReportList();
            Swal.fire({
              title: 'Success',
              text: 'Report moderated successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          })
          .catch((error) => {
            console.error("Error moderating report: ", error);
            Swal.fire({
              title: 'Error',
              text: 'Failed to moderate report. Please try again later.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          });
      }
    });
  });
}