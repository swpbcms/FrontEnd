
$(document).ready(function(){
    var loggedInMember = sessionStorage.getItem("loggedInMember");
    if(loggedInMember){
        var mem = JSON.parse(loggedInMember);

        var memberFullName = mem.memberFullName;
        var memberImage = mem.memberImage;

        $('#fullname').html(memberFullName);
        $('#member-image').attr('src', memberImage);
    }
});


$(document).ready(function(){
    $("#logoutButton").click(function() {
        // Clear the session storage
        sessionStorage.removeItem("loggedInMember");
        // Redirect to the login page or perform any other desired action
        window.location.href = "sign-in.html";
    });
})

$(document).ready(function(){
    $.ajax({
        url: 'đường_dẫn_đến_endpoint_api',
        method: 'GET',
        success: function(response) {
          // Xử lý kết quả trả về ở đây
        },
        error: function(xhr, status, error) {
          // Xử lý lỗi ở đây (nếu có)
        }
      });
      



})


  