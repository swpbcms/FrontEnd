
$(document).ready(function(){
    var loggedInMember = sessionStorage.getItem("loggedInMember");
    if(loggedInMember){
        var mem = JSON.parse(loggedInMember);

        var result = mem.memberFullName;
        $('#fullname').html(result);
    }
})

$(document).ready(function(){
    $("#logoutButton").click(function() {
        // Clear the session storage
        sessionStorage.removeItem("loggedInMember");
        // Redirect to the login page or perform any other desired action
        window.location.href = "sign-in.html";
    });
})

  