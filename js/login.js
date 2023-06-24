// var memberUserName = document.querySelector('#memberUserName')
// var memberPassword = document.querySelector('#memberPassword')
// var form = document.querySelector('.c-form')

// function showError(input, message) {
//     let parent = input.parentElement;
//     let small = parent.querySelector('small')

//     parent.classList.add('error')
//     small.innerText = message
// }
// function showSuccess(input) {
//     let parent = input.parentElement;
//     let small = parent.querySelector('small')

//     parent.classList.remove('error')
//     small.innerText = ''
// }

// function checkEmpty(listInput) {
//     let isEmptyError = false;
//     listInput.value = listInput.value.trim()

//     if (listInput.value == '') {
//         isEmptyError = true;
//         showError(listInput, 'Can not empty')
//     } else {
//         showSuccess(listInput)
//     }
//     return isEmptyError
// }

// const login = "https://localhost:7206/api/Member/login-Member";

// form.addEventListener('submit', function (e) {
//     e.preventDefault()

//     var isEmptyError = [memberUserName, memberPassword]
//     isEmptyError.forEach(checkEmpty)

//     if (isEmptyError) {

//     } else {
//         fetch(login, {
//             method: 'POST',
//             headers: {
//                 Accept: "application/json, */*",
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 memberUserName: memberUserName.value,
//                 memberPassword: memberPassword.value
//             })
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log(data);
//                 if (data.success) { 
//                     window.open(
//                         "index.html"
//                     );
//                 } else {
//                     alert("Error UserName or Password");
//                 }
//             })
//             .catch(error => {
//                 console.error('Lỗi:', error);
//             });
//     }

// })


// fetch ('https://localhost:7206/swagger/index.html')
// .then(res => res.json())
// .then(data => console.log(data))

// const express = require("express")
// const app = express()
// const cors = require("cors")
// app.use(
//     cors({
//         origin: "*"
//     })
// )

// app.listen(7206)

$(document).ready(function() {
    // Xử lý sự kiện submit của biểu mẫu
    $("#loginForm").submit(function(event) {
        event.preventDefault(); // Ngăn chặn gửi yêu cầu mặc định

        // Lấy giá trị tên đăng nhập và mật khẩu từ người dùng
        var username = $("#memberUserNameInput").val();
        var password = $("#memberPasswordInput").val();

        // Tạo đối tượng chứa dữ liệu gửi đi
        var data = {
            memberUserName: username,
            memberPassword: password
        };

        // Gửi yêu cầu AJAX POST đến API
        $.ajax({
            url: "https://localhost:7206/api/Member/login-Member",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function(response) {
                // Xử lý phản hồi từ API
                /*         if (response.data) {
            // Kiểm tra dữ liệu phản hồi nếu thành công
            var member = response.data;
            // Xử lý dữ liệu thành viên ở đây
            // Ví dụ: chuyển trang và lưu session đăng nhập
            window.location.href = "index.html";
            sessionStorage.setItem("loggedInMember", JSON.stringify(member));
          } else {
            // Xử lý khi đăng nhập không thành công
            console.log("Tên đăng nhập hoặc mật khẩu không đúng");
          }
        },
        error: function(error) {
          // Xử lý khi có lỗi xảy ra trong quá trình gửi yêu cầu
          console.log("Đã xảy ra lỗi: " + error);
        }
      });
    });
  });
*/
                if (response.data) {
                    // Kiểm tra dữ liệu phản hồi nếu thành công
                    var member = response.data;
                    if (member.role === "admin") {
                        // Người dùng có vai trò là admin
                        // Xử lý dữ liệu ở đây
                        window.location.href = "admin.html";
                    } else {
                        // Người dùng không có vai trò là admin
                        // Xử lý dữ liệu thành viên ở đây
                        window.location.href = "index.html";
                    }
                    // Lưu session đăng nhập
                    sessionStorage.setItem("loggedInMember", JSON.stringify(member));
                } else {
                    // Xử lý khi đăng nhập không thành công
                    console.log("Tên đăng nhập hoặc mật khẩu không đúng");
                }
            },
            error: function(error) {
                // Xử lý khi có lỗi xảy ra trong quá trình gửi yêu cầu
                console.log("Đã xảy ra lỗi: " + error);
            }
        });
    });
});