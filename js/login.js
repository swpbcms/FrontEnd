var memberUserName = document.querySelector('#memberUserName')
var memberPassword = document.querySelector('#memberPassword')
var form = document.querySelector('form')




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


form.addEventListener('submit', function (e) {
    e.preventDefault()

    let isEmptyError = [memberUserName, memberPassword]
    isEmptyError.forEach(checkEmpty)
    var xhttp = new XMLHttpRequest();

    if (isEmptyError) {

    } else {
        xhttp.open('POST', 'https://localhost:7206/api/Member/login-Member', true)

        xhttp.send(memberUserName, memberPassword);
        
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                window.location.href = 'feed.html'
                this.responseText;
            }
        }
    }

})




