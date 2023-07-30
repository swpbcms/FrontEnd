$(document).ready(function() {
    $("#loginForm").submit(function(event) {
        event.preventDefault(); // prevent the browser's default action on form submit

        var username = $("#userNameInput").val();
        var password = $("#passwordInput").val();

        // Construct the API URL with the entered username and password
        var apiUrl = "https://localhost:7206/api/Admin/login-admin?username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);

        // Call the login API for admin login
        $.ajax({
            url: apiUrl,
            type: "POST",
            success: function(data, textStatus, jqXHR) {
                if (data && data.data && data.data.username && data.data.password) {
                    // Admin login successful
                    sessionStorage.setItem('username', data.data.username);
                    sessionStorage.setItem('password', data.data.password);
                    window.location.href = "admin.html";
                } else {
                    // Try Manager login
                    managerLogin();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Error in Admin login API call:", errorThrown);
                // Try Manager login
                managerLogin();
            }
        });
    });

    function managerLogin() {
        var username = $("#userNameInput").val();
        var password = $("#passwordInput").val();

        // Manager login API call
        $.ajax({
            url: "https://localhost:7206/api/Manager/login-Manager",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                managerUserName: username,
                managerPassword: password
            }),
            success: function(response) {
                if (response.data) {
                    // Manager login successful
                    var manager = response.data;
                    sessionStorage.setItem("loggedInManager", JSON.stringify(manager));
                    window.location.href = "manager.html";
                } else {
                    // Move to Member login
                    memberLogin();
                }
            },
            error: function(error) {
                console.log("Error in Manager login API call:", error);
                // Move to Member login
                memberLogin();
            }
        });
    }

    function memberLogin() {
        var username = $("#userNameInput").val();
        var password = $("#passwordInput").val();

        // Member login API call
        $.ajax({
            url: "https://localhost:7206/api/Member/login-Member",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                memberUserName: username,
                memberPassword: password
            }),
            success: function(response) {
                if (response.data) {
                    // Member login successful
                    var member = response.data;
                    sessionStorage.setItem("loggedInMember", JSON.stringify(member));
                    window.location.href = "index.html";
                } else {
                    // All login attempts failed
                    Swal.fire({
                        icon: 'error',
                        title: 'Đăng nhập thất bại',
                        text: 'Tên đăng nhập hoặc mật khẩu không đúng'
                    });
                }
            },
            error: function(error) {
                console.log("Error in Member login API call:", error);
                // All login attempts failed
                Swal.fire({
                    icon: 'error',
                    title: 'Đăng nhập thất bại',
                    text: 'Tên đăng nhập hoặc mật khẩu không đúng'
                });
            }
        });
    }
});
