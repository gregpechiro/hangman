const setMessage = (message, color = 'black') => {
	msgDiv.style.color = color;
	msgDiv.innerHTML = message;
}

const setSuccessMessage = (successMessage) => {
	setMessage(successMessage, 'green');
}

const setErrorMessage = (errorMessage) => {
	setMessage(errorMessage, 'red');
}