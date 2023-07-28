$(document).ready(function () {
    // Handle the form submit event
    $("#loginForm").submit(function (event) {
        event.preventDefault(); // prevent the browser's default action on form submit

        // Get values from form fields
        var username = $("#userNameInput").val();
        var password = $("#passwordInput").val();

        // Construct the API URL with the entered username and password
        var apiUrl = "https://localhost:7206/api/Admin/login-admin?username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);

        // Call the login API
        $.ajax({
            url: apiUrl,
            type: "POST",
            success: function (data, textStatus, jqXHR) {
                if (data && data.data && data.data.username && data.data.password) {
                    // Store data into sessionStorage
                    sessionStorage.setItem('username', data.data.username);
                    sessionStorage.setItem('password', data.data.password);

                    // Redirect to admin.html
                    window.location.href = "admin.html";
                } else {
                    alert("Login failed!");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error in API call:", errorThrown);
                alert("Login failed!");
            }
        });
    });
});
    