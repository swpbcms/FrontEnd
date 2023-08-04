$(document).ready(function () {
  // Function to update the profile display with the latest data
  function updateProfileDisplay() {
    var loggedInMember = sessionStorage.getItem("loggedInMember");
    if (loggedInMember) {
      var mem = JSON.parse(loggedInMember);

      var memberFullName = mem.memberFullName;
      var memberImage = mem.memberImage;
      $('#fullname').html(memberFullName);
      $('#image').attr('src', memberImage);
    }
  }

  // Load the profile data on page load
  updateProfileDisplay();

  $(document).ready(function () {
    $("#logoutButton").click(function () {
      sessionStorage.removeItem("loggedInMember");
      window.location.href = "feed.html";
    });
  });

  $(document).ready(function () {
    $("#signup").submit(function (event) {
      event.preventDefault();

      // Validate required fields
      var gender = $("input[name='gender']:checked").val();
      var fullName = $("#FullNameInput input").val();
      var email = $("#EmailInput input").val();
      var password = $("#PasswordInput input").val();
      var dob = $("#DateOfBirthInput input").val();
      var imageFileInput = document.getElementById("ImageFileInput");
      var imageBase64 = "";

      if (!gender || !fullName || !email || !password || !dob || !imageFileInput.files[0]) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Vui lòng điền đầy đủ thông tin và thêm ảnh đại diện!",
        });
        return;
      }

      // Check if email already exists
      async function checkEmailExists(email) {
        try {
          const response = await $.ajax({
            url: "https://localhost:7206/api/Member/All-Member",
            type: "GET",
            headers: {
              "accept": "*/*",
            },
          });

          const members = response.data;
          return members.some(function (member) {
            return member.memberEmail === email;
          });
        } catch (error) {
          console.log("Đã xảy ra lỗi khi kiểm tra email tồn tại: " + error);
          console.log(error);
          return true; // Assume email exists to prevent update on error
        }
      }

      // Perform the email existence check
      checkEmailExists(email)
        .then(function (emailExists) {
          if (emailExists) {
            Swal.fire({
              icon: "error",
              title: "Lỗi",
              text: "Email đã tồn tại!",
            });
          } else {
            // If email does not exist, proceed with updating the profile
            if (imageFileInput.files && imageFileInput.files[0]) {
              var reader = new FileReader();

              reader.onload = function (e) {
                imageBase64 = e.target.result;
                updateUserProfile(gender, imageBase64, fullName, email, password, dob);
              };

              reader.readAsDataURL(imageFileInput.files[0]);
            } else {
              updateUserProfile(gender, null, fullName, email, password, dob);
            }
          }
        })
        .catch(function (error) {
          console.log("Đã xảy ra lỗi khi kiểm tra email tồn tại: " + error);
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Đã xảy ra lỗi khi kiểm tra email tồn tại!",
          });
        });
    });
  });

  function updateUserProfile(gender, imageBase64, fullName, email, password, dob) {
    var loggedInMember = sessionStorage.getItem("loggedInMember");
    if (loggedInMember) {
      var mem = JSON.parse(loggedInMember);
      var memid = mem.memberId;

      var data = {
        memberId: memid,
        memberGender: gender,
        memberImage: imageBase64,
        memberFullName: fullName,
        memberEmail: email,
        memberPassword: password,
        memberDob: dob,
      };

      $.ajax({
        url: "https://localhost:7206/api/Member/Update-member",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
          if (response.data) {
            // Update the session storage with the latest profile data
            sessionStorage.setItem("loggedInMember", JSON.stringify(data));

            Swal.fire({
              icon: "success",
              title: "Cập nhật thành công",
              showConfirmButton: false,
              timer: 1500
            }).then(function() {
              // Clear the form after successful update
              $("#signup")[0].reset();
              // Update the profile display with the latest data
              updateProfileDisplay();
            });
          } else {
            console.log("Thay đổi không thành công");
          }
        },
        error: function (xhr, status, error) {
          console.log("Đã xảy ra lỗi khi cập nhật thông tin thành viên:");
          console.log(xhr.responseText);
          console.log(status);
          console.log(error);
        }
      });
    }
  }

  $(document).ready(function () {
    $("#deleteAccountButton").click(function (event) {
      event.preventDefault();

      Swal.fire({
        title: "Khóa tài khoản",
        text: "Bạn có chắc chắn muốn khóa tài khoản?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Khóa",
        cancelButtonText: "Hủy",
      }).then(function (result) {
        if (result.isConfirmed) {
          var loggedInMember = sessionStorage.getItem("loggedInMember");
          if (loggedInMember) {
            var mem = JSON.parse(loggedInMember);
            var memberId = mem.memberId;
            deleteAccount(memberId);
          } else {
            console.log("Người dùng chưa đăng nhập");
          }
        }
      });
    });
  });

  function deleteAccount(memberId) {
    $.ajax({
      url: "https://localhost:7206/api/Member/Delete-member?id=" + memberId,
      type: "DELETE",
      headers: {
        "accept": "*/*",
      },
      success: function (response) {
        if (response.data) {
          Swal.fire({
            icon: "success",
            title: "Khóa tài khoản thành công",
            showConfirmButton: false,
            timer: 1500
          }).then(function() {
            window.location.href = "feed.html";
          });
        } else {
          console.log("Khóa tài khoản không thành công");
        }
      },
      error: function (error) {
        console.log("Đã xảy ra lỗi khi khóa tài khoản: " + error);
        console.log(error);
      }
    });
  }

  $(document).ready(function () {
    $('#searchInput').on('keydown', function (event) {
      if (event.which === 13) {
        event.preventDefault();
        var searchQuery = $(this).val();
        if (searchQuery.trim() !== '') {
          searchAndNavigate(searchQuery);
        }
      }
    });
  });

  function searchAndNavigate(query) {
    var url = 'https://localhost:7206/api/Post/search-postuser?search=' + encodeURIComponent(query);
    var variable = query;
    localStorage.setItem('myVariable', url);
    localStorage.setItem('query', variable);
    window.location.href = 'search-result.html';
  }
});
