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

//check email 
function checkEmail(input) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(re.test(input.value.trim())){
    	onSuccess(input);
    } else {
    	onError(input,'Email is not valid');
    }
}


// check required fields

function checkRequired(inputArray){
	inputArray.forEach(function(input){
		if(input.value.trim() == ''){
			onError(input, `${getFieldName(input)} is required`);
		} else {
			onSuccess(input);
		}
	})
}

// check length of input
function checkLength(inputArray){
	inputArray.forEach(function(inputObj){
		const input = inputObj.input;
		const min = inputObj.min;
		const max = inputObj.max;
		if(input.value.length < min){
			onError(input,`${getFieldName(input)} must be atleast ${min}`);
		} else if(input.value.length > max){
			onError(input, `${getFieldName(input)} must be less than ${max}`)
		} else {
			onSuccess(input);
		}
	})
}

//check passwords match
function checkPasswordMatch(input1, input2){
	if(input1.value != input2.value){
		onError(password2,'Passwords do not match.')
	} else {
		onSuccess(password2);
	}
}

// get fields name : return field name with first letter as capital
function getFieldName(input){
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    checkRequired([username,email,password,password2]);
    checkLength([{
    	input:username,
    	min:3,
    	max:4
    },{
    	input:password,
    	min:6,
    	max:25
    },{
    	input:password2,
    	min:6,
    	max:25
    }]);
    checkEmail(email);
    checkPasswordMatch(password,password2);
})

