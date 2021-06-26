let registerForm = document.getElementById("registerUser");
let createAccountStatus = document.getElementById("createAccountStatus");
let loginStatus = document.getElementById("loginStatus");

registerForm.addEventListener("submit", (e) => {
	e.preventDefault();

	let firstName = document.getElementById("firstName").value;
	let lastName = document.getElementById("lastName").value;
	let mobileNumber = document.getElementById("mobileNumber").value;
	let userEmail = document.getElementById("userEmail").value;
	let password1 = document.getElementById("password1").value;
	let password2 = document.getElementById("password2").value;
	let registerUser = document.getElementById("registerUser").value;

	const passwordValidation = /^(?=.*)(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;
	let validForm = true;

	if (firstName.length<=0) { 
		validForm = false;
		let specs = {
			image: "name.svg",
			inputId: "firstName",
			placeholder: "First Name",
			type: "text"
		}
		registerFirstNameError(specs)
	} else {
		let specs = {
			image: "name.svg",
			inputId: "firstName",
			placeholder: "First Name",
			type: "text",
			previousValue: firstName
		}
		registerFirstNameSuccess(specs);
	}

	if (lastName.length<=0) { 
		validForm = false;
		let specs = {
			image: "identification.svg",
			inputId: "lastName",
			type: "text",
			placeholder: "Last Name"
		}
		registerLastNameError(specs);
	} else {
		let specs = {
			image: "identification.svg",
			inputId: "lastName",
			placeholder: "Last Name",
			type: "text",
			previousValue: lastName
		}
		registerLastNameSuccess(specs);
	}

	if (mobileNumber.length<11) { 
		validForm = false;
		let specs = {
			image: "smartphone.svg",
			inputId: "mobileNumber",
			type: "number",
			placeholder: "Mobile Number"
		}
		registerMobileNumberError(specs);
	} else {
		let specs = {
			image: "smartphone.svg",
			inputId: "mobileNumber",
			placeholder: "Mobile Number",
			type: "number",
			previousValue: mobileNumber
		}
		registerMobileNumberSuccess(specs);
	}

	if (userEmail.length<=0) { 
		validForm = false;
		let specs = {
			image: "email.svg",
			inputId: "userEmail",
			placeholder: "User Email",
			type: "email"
		}
		registerUserEmailError(specs);
	} else {
		let specs = {
			image: "email.svg",
			inputId: "userEmail",
			placeholder: "User Email",
			type: "email",
			previousValue: userEmail
		}
		registerUserEmailSuccess(specs);
	}

	if (!passwordValidation.test(password1) || password1!=password2) {
		validForm = false;
		let password1Specs = {
			image: "padlock.svg",
			inputId: "password1",
			type: "password",
			placeholder: "Input Password"
		}
		registerUserPassword1Error(password1Specs);

        let password2specs = {
			image: "password.svg",
			inputId: "password2",
			type: "password",
			placeholder: "Verify Password"
		}
		registerUserPassword2Error(password2specs);

	} else {
		let password1Specs = {
			image: "padlock.svg",
			inputId: "password1",
			placeholder: "Input Password",
			type: "password",
			previousValue: password1
		}
		registerUserPassword1Success(password1Specs);

        let password2Specs = {
			image: "password.svg",
			inputId: "password2",
			placeholder: "Verify Password",
			type: "password",
			previousValue: password2
		}
		registerUserPassword2Success(password2Specs)
	}

	if (validForm) {
		createAccountStatus.innerHTML = 
		`
			<div class=" flex items-center justify-center text-center undefined">
				<div class="styles__Spinner-sc-1yksbqq-2 ca-anim"></div>
				<span class="pl-1.5 text-utils-loader pt-px">Checking if the email already exists...</span>
	        </div>
		`

		fetch('https://rocky-reaches-53288.herokuapp.com/api/users/email-exists', {
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify({
				"email": userEmail
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data === true) {
				createAccountStatus.innerHTML = 
					`
						<div class="py-0 px-4 h-full flex items-center justify-center text-center bg-white text-error">
                      		<span>
                        		<p>Email: ${userEmail} already exists.</p>
                      		</span>
                    	</div
					`
			} else if (data === false) {
				createAccountStatus.innerHTML = 
				`
					<div class=" flex items-center justify-center text-center undefined">
						<div class="styles__Spinner-sc-1yksbqq-2 ca-anim"></div>
						<span class="pl-1.5 text-utils-loader pt-px">Creating the account...</span>
					</div>
				` 

				fetch('https://rocky-reaches-53288.herokuapp.com/api/users/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						"firstName": firstName,
						"lastName": lastName,
						"email": userEmail,
						"mobileNumber": mobileNumber,
						"password": password1,
						"isAdmin": false
					})
				})
				.then(res => {
					return res.json()
				})
				.then(data => {
					if(data === true){
						$("#join-page").addClass("hide");
						$("#login-page").removeClass("hide");
						loginStatus.innerHTML = 
							`
								<div class="py-0 px-4 h-full flex items-center justify-center text-center bg-white text-success">
								    <span>Account creation was successful. You may now login using ${userEmail}.</span>
								</div>
	                      	`
					} else{
						createAccountStatus.innerHTML = 
							`
								<div class="py-0 px-4 h-full flex items-center justify-center text-center bg-white text-error">
		                      		<span>
		                        		<p>Something went wrong. Please try again later.</p>
		                      		</span>
		                    	</div
							`
					}
				})
				.catch(e => {
					createAccountStatus.innerHTML = 
					`
						<div class="py-0 px-4 h-full flex items-center justify-center text-center bg-white text-error">
							  <span>
								<p>Something went wrong. Please try again later.</p>
							  </span>
						</div
					`
				})
			}
		})
	}
});

