var memberUserName = document.querySelector('#memberUserName')
var memberPassword = document.querySelector('#memberPassword')
var form = document.querySelector('form')

function showError(input, message){
    let parent = input.parentElement;
    let small = parent.querySelector('small')

    parent.classList.add('error')
    small.innerText = message
}
function showSuccess(input){
    let parent = input.parentElement;
    let small = parent.querySelector('small')

    parent.classList.remove('error')
    small.innerText = ''
}

function checkEmpty(listInput){
        let isEmptyError = false;
        listInput.value = listInput.value.trim()

            if(listInput.value == ''){
                isEmptyError = true;
                showError(listInput, 'Khong dc de trong')
            }else{
                showSuccess(listInput)
            }
        return isEmptyError
}

form.addEventListener('submit', function(e){
    e.preventDefault()

    let isEmptyError = [memberUserName, memberPassword]
    isEmptyError.forEach(checkEmpty)

    if (isEmptyError){

    }else{
        
    }
})




