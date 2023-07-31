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

  $(document).ready(function() {
    var recentEvents = []; // Mảng lưu trữ 3 sự kiện gần nhất

    function updateEvent(event, index) {
      $("#eventList .eventImage" + index).attr("src", event.media[0].linkMedia);
      $("#eventList .eventTitle" + index).text(event.postTitle);
      $("#eventList .eventDescription" + index).text(event.postDescription);
    }

    function showNextEvent() {
      var currentIndex = 0;
      setInterval(function() {
        updateEvent(recentEvents[currentIndex], 1);
        updateEvent(recentEvents[(currentIndex + 1) % recentEvents.length], 2);
        updateEvent(recentEvents[(currentIndex + 2) % recentEvents.length], 3);
        currentIndex = (currentIndex + 1) % recentEvents.length;
      }, 5000); // Đổi sự kiện sau mỗi 5 giây (5000 milliseconds)

      // Hiển thị sự kiện đầu tiên
      updateEvent(recentEvents[currentIndex], 1);
      updateEvent(recentEvents[(currentIndex + 1) % recentEvents.length], 2);
      updateEvent(recentEvents[(currentIndex + 2) % recentEvents.length], 3);
    }

    $.ajax({
      url: "https://localhost:7206/api/Post/get-post",
      type: "GET",
      success: function(response) {
        var posts = response.data;
        var events = posts.filter(function(post) {
          return post.postIsEvent === true && post.postStatus == "Thành công";
        });

        // Sort events by the most recent ones (assuming they have a timestamp property)
        events.sort(function(a, b) {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });

        // Take the first 3 events (most recent ones)
        recentEvents = events.slice(0, 3);

        // Show the events
        showNextEvent();
      },
      error: function(error) {
        console.log("Error in fetching post data:", error);
      }
    });
  });
