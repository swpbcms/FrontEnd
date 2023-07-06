$(document).ready(function() {
    // Xử lý sự kiện submit của biểu mẫu
    $("#close").submit(function(event) {
        event.preventDefault(); // Ngăn chặn gửi yêu cầu mặc định

        // Lấy memberId từ sessionStorage
        var loggedInMember = sessionStorage.getItem("loggedInMember");
        if (loggedInMember) {
            var mem = JSON.parse(loggedInMember);
            var memid = mem.memberId;
            console.log("id đã lấy được: " + memid);


        }
    });
});
