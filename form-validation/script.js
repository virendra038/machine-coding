const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// show on correct input
function onSuccess(input){
	const formControl = input.parentElement;
	formControl.className = 'form-control success'
}

// show error on incorrect input
function onError(input, message){
	const formControl = input.parentElement;
	formControl.className = 'form-control error'
	const small = formControl.querySelector('small');
	small.innerText = message;
}


form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (username.value == '') {
        onError(username,'invalid username')
    } else {
        onSuccess(username);
    }

    if (email.value == '') {
        onError(email,'invalid email')
    } else {
        onSuccess(email);
    }

    if (password.value == '') {
        onError(password,'invalid password')
    } else {
        onSuccess(password);
    }

    if (password2.value == '') {
        onError(password2,'invalid password2')
    } else {
        onSuccess(password2);
    }

})

