var memberUserName = document.querySelector('#memberUserName')
var memberPassword = document.querySelector('#memberPassword')
var form = document.querySelector('.c-form')




function showError(input, message) {
    let parent = input.parentElement;
    let small = parent.querySelector('small')

    parent.classList.add('error')
    small.innerText = message
}
function showSuccess(input) {
    let parent = input.parentElement;
    let small = parent.querySelector('small')

    parent.classList.remove('error')
    small.innerText = ''
}

function checkEmpty(listInput) {
    let isEmptyError = false;
    listInput.value = listInput.value.trim()

    if (listInput.value == '') {
        isEmptyError = true;
        showError(listInput, 'Khong dc de trong')
    } else {
        showSuccess(listInput)
    }
    return isEmptyError
}

const login = "https://localhost:7206/api/Member/login-Member";

form.addEventListener('submit', function (e) {
    e.preventDefault()

    var isEmptyError = [memberUserName, memberPassword]
    isEmptyError.forEach(checkEmpty)


    if (isEmptyError) {
        
    } else {
        fetch(login, {
            method: 'POST',
            headers: {
                Accept: "application/json, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                memberUserName: memberUserName.value,
                memberPassword: memberPassword.value
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.success) { 
                    window.open(
                        "index.html"
                    );
                } else {
                    alert("Error UserName or Password");
                }
            })
            .catch(error => {
                console.error('Lỗi:', error);
            });
    }

})






