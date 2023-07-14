$(document).ready(function() {
    // Fetch manager list using AJAX
    $.ajax({
      url: "https://localhost:7206/api/Manager/All-Manager",
      type: "GET",
      dataType: "json",
      success: function(response) {
        // Handle API response
        if (response && response.data) {
          // Process the manager list data and display it on the page
          var managers = response.data;
  
          // Display manager list
          displayManagerList(managers);
        } else {
          console.log("Failed to fetch manager list");
        }
      },
      error: function(error) {
        console.log("An error occurred while fetching manager list: " + error);
        console.log(error);
      }
    });
  
    // Display manager list
    function displayManagerList(managers) {
      var managerListHTML = "<h2>Danh sách quản lý</h2>";
      managerListHTML += "<div class='table-responsive'><table class='uk-table uk-table-hover uk-table-divider'>";
      managerListHTML += "<thead><tr><th>ID</th><th>Tên đăng nhập</th><th>Số điện thoại</th><th>Mật khẩu</th><th>Email</th><th>Trạng thái</th><th>Hình ảnh</th></thead><tbody>";
      
      for (var i = 0; i < managers.length; i++) {
        var manager = managers[i];
        var status = manager.managerStatus ? "Hoạt động" : "Không hoạt động";
        
        managerListHTML += "<tr>";
        managerListHTML += "<td>" + manager.managerId + "</td>";
        managerListHTML += "<td>" + manager.managerUserName + "</td>";
        managerListHTML += "<td>" + manager.managerPhone + "</td>";
        managerListHTML += "<td>" + manager.managerPassword + "</td>";
        managerListHTML += "<td>" + manager.managerEmail + "</td>";
        managerListHTML += "<td>" + status + "</td>";
        managerListHTML += "<td>" + manager.managerFullName + "</td>";
        managerListHTML += "<td><img src='" + manager.managerImage + "' alt='Avatar' class='member-image' /></td>";

        managerListHTML += "</tr>";
      }
      
      managerListHTML += "</tbody></table></div>";
      
      $("#components-nav li:nth-child(2)").html(managerListHTML);
    }
    
    
    
  });