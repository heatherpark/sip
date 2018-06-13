export const checkValidity = (value, rules) => {
	let isValid = true;
	if (!rules) {
		return true;
	}

	if (rules.required) {
		isValid = value.trim() !== '' && isValid;
	}

	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid
	}

	if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid
	}

	if (rules.isEmail) {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		isValid = pattern.test(value) && isValid
	}

	if (rules.isNumeric) {
		const pattern = /^\d+$/;
		isValid = pattern.test(value) && isValid
	}

	return isValid;
};

export const formIsValid = (form) => {
	let formIsValid = true;

	for (let field in form) {
		formIsValid = form[field].valid && formIsValid;
	}

	return formIsValid;
};