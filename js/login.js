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


form.addEventListener('submit', function (e) {
    e.preventDefault()

    let isEmptyError = [memberUserName, memberPassword]
    isEmptyError.forEach(checkEmpty)


    if (isEmptyError) {

    } else {
        var fromData = new FormData(form);
        var data = Object.fromEntries(fromData);

        fetch('https://localhost:7206/api/Member/login-Member',{
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    };
})




