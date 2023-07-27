import { getManagers, deleteManager } from "./services/manager.service.js";

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
    sessionStorage.removeItem("loggedInManager");
    // Redirect to the login page or perform any other desired action
    window.location.href = "feed.html";
  });
});

$(document).ready(function() {
  // Fetch manager list using API call from manager.service.js
  getManagers()
    .then((response) => {
      if (response && response.data) {
        // Process the manager list data and display it on the page
        var managers = response.data;

        // Display manager list
        displayManagerList(managers);
      } else {
        console.log("Failed to fetch manager list");
      }
    })
    .catch((error) => {
      console.log("An error occurred while fetching manager list: " + error);
      console.log(error);
    });

  // Display manager list
  function displayManagerList(managers) {
    var managerListHTML = "<h2>Danh sách quản lý</h2>";
    managerListHTML += "<div class='table-responsive'><table class='uk-table uk-table-hover uk-table-divider'>";
    managerListHTML += "<thead><tr><th>ID</th><th>Tên đăng nhập</th><th>Số điện thoại</th><th>Mật khẩu</th><th>Email</th><th>Trạng thái</th><th>Hình ảnh</th><th>Thao tác</th></tr></thead><tbody>";

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

      managerListHTML += "<td><button class='uk-button uk-button-small uk-button-danger delete-manager-btn' data-manager-id='" + manager.managerId + "'>Delete</button></td>";
      managerListHTML += "</tr>";
    }

    managerListHTML += "</tbody></table></div>";

    $("#components-nav li:nth-child(2)").html(managerListHTML);

    // Add the "Delete Manager" button event listener here
    $(".delete-manager-btn").on("click", function () {
      const managerId = $(this).data("manager-id");

      // Show a confirmation dialog before proceeding with the deletion
      const confirmation = confirm("Are you sure you want to delete this manager?");
      if (!confirmation) {
        // If the user cancels the deletion, do nothing
        return;
      }

      // Call the deleteManager function to delete the manager
      deleteManager(managerId)
        .then(() => {
          // Do not remove the manager from the list immediately.
          // You can choose to reload the manager list to reflect the changes after successful deletion.
          // You can call getManagers() again here or simply remove the deleted row
          loadManagers(); // Assuming you have a function to reload the manager list
        })
        .catch((error) => {
          console.error("Error deleting manager: ", error);
          // Handle error if needed
        });
    });

    function loadManagers() {
      getManagers()
        .then((response) => {
          if (response && response.data) {
            // Process the manager list data and display it on the page
            var managers = response.data;

            // Display manager list
            displayManagerList(managers);
          } else {
            console.log("Failed to fetch manager list");
          }
        })
        .catch((error) => {
          console.log("An error occurred while fetching manager list: " + error);
          console.log(error);
        });
    }
  }
});
