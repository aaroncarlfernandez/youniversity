document.getElementById("loginButton").addEventListener('click', (e) => {
	document.documentElement.classList.add("overflow-hidden");
	document.getElementById("login-page").classList.remove("hide");
	document.getElementById("loginStatus").innerHTML = "";

	let loginSpecs = {
		image: "email.svg",
		inputId: "loginEmail",
		placeholder: "Email",
		type: "email",
		previousValue: ""
	}
	loginEmailSuccess(loginSpecs);

	let passwordSpecs = {
		image: "password.svg",
		inputId: "loginPassword",
		placeholder: "Password",
		type: "password",
		previousValue: ""
	}
	loginPasswordSuccess(passwordSpecs);
});

document.getElementById("loginCloseButton").addEventListener('click', (e) => {
	document.documentElement.classList.remove("overflow-hidden");
	document.getElementById("login-page").classList.add("hide");
});

document.getElementById("joinButton").addEventListener('click', (e) => {
	document.documentElement.classList.add("overflow-hidden");
	document.getElementById("join-page").classList.remove("hide");

	let firstNamespecs = {
		image: "name.svg",
		inputId: "firstName",
		placeholder: "First Name",
		type: "text",
		previousValue: ""
	}
	registerFirstNameSuccess(firstNamespecs);

	let lastNamespecs = {
		image: "identification.svg",
		inputId: "lastName",
		placeholder: "Last Name",
		type: "text",
		previousValue: ""
	}
	registerLastNameSuccess(lastNamespecs);

	let mobileNumberspecs = {
		image: "smartphone.svg",
		inputId: "mobileNumber",
		placeholder: "Mobile Number",
		type: "number",
		previousValue: ""
	}
	registerMobileNumberSuccess(mobileNumberspecs );

	let userEmailspecs = {
		image: "email.svg",
		inputId: "userEmail",
		placeholder: "User Email",
		type: "email",
		previousValue: ""
	}
	registerUserEmailSuccess(userEmailspecs);

	let password1Specs = {
		image: "padlock.svg",
		inputId: "password1",
		placeholder: "Input Password",
		type: "password",
		previousValue: ""
	}
	registerUserPassword1Success(password1Specs);

	let password2Specs = {
		image: "password.svg",
		inputId: "password2",
		placeholder: "Verify Password",
		type: "password",
		previousValue: ""
	}
	registerUserPassword2Success(password2Specs)
});

document.getElementById("joinCloseButton").addEventListener('click', (e) => {
	document.getElementById("createAccountStatus").innerHTML = ``

	document.documentElement.classList.remove("overflow-hidden");
	document.getElementById("join-page").classList.add("hide");
});

document.getElementById("signUpSuggestion").addEventListener('click', (e) => {
	document.getElementById("login-page").classList.add("hide");
	document.getElementById("loginEmail").value = '';
	document.getElementById("loginPassword").value = '';
	document.getElementById("join-page").classList.remove("hide");
});

document.getElementById("loginSuggestion").addEventListener('click', (e) => {
	document.getElementById("createAccountStatus").innerHTML = ``
	document.getElementById("firstName").value = '';
	document.getElementById("lastName").value = '';
	document.getElementById("mobileNumber").value = '';
	document.getElementById("userEmail").value = '';
	document.getElementById("password1").value = '';
	document.getElementById("password2").value = '';
	document.getElementById("registerUser").value = '';

	document.getElementById("join-page").classList.add("hide");
	document.getElementById("login-page").classList.remove("hide");
});