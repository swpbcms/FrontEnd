//Show trang manager khi login account role 

const managerlink = document.getElementById("manager-link");
if (currentUser.role === "admin") {
    managerlink.style.display = "block";
} else {
    managerlink.style.display = "none";
}