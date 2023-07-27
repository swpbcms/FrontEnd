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
  reportListHTML += "<thead><tr><th>ID</th><th>Tiêu đề</th><th>ID Quản lý</th><th>ID Thành viên</th><th>Loại đơn</th><th>Trạng thái</th><th>Mô tả</th><th>Thời gian</th><th>Trả lời</th></tr></thead><tbody>";

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
    reportListHTML += "</tr>";
  }

  reportListHTML += "</tbody></table></div>";

  $("#components-nav li:nth-child(2)").html(reportListHTML);
}
