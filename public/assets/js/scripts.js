document.addEventListener('DOMContentLoaded', function() {
	if (localStorage.length===0) {
		if (document.getElementById("must-be-logged-in")) {
			window.location.replace("../pages/error.html");
		}
	} 
	if (document.getElementById("courseAuthorDiv")) {
		document.getElementById("courseAuthor").innerHTML = `${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`
	}
}, false);

$(window).on('scroll', function() {
	var scroll=$(window).scrollTop();
	if (scroll>=100) {
		$(".scrolling-navbar").addClass("top-nav-collapse");
	} else {
		$(".scrolling-navbar").removeClass("top-nav-collapse");}
	}
);

$('#nav-sidebar-toggle').click(function() {
	if ($('#__next').hasClass('sidebar-style-00')) {
		$("#__next").removeClass("sidebar-style-00");
	} else if ($('#__next').hasClass('sidebar-style-01')) {
		$("#__next").removeClass("sidebar-style-01");
	} else {
		if ($( window ).width()>420) {
			$("#__next").addClass("sidebar-style-00");
		} else {
			$("#__next").addClass("sidebar-style-01");
		}
	}
});

function loginEmailError(specs) {
	document.getElementById("loginEmailLoginDiv").classList.remove("border-gray-400","focus-within:border-primary","focus-within:ring-primary");
	document.getElementById("loginEmailLoginDiv").classList.add("pr-3.5","border-danger","focus-within:border-danger","focus-within:ring-error");
	document.getElementById("loginEmailError").innerHTML = loginErrorMessage("Email is a required field");
	document.getElementById("loginEmailLoginDiv").innerHTML = `${errorLoginDiv(specs)}`;
}

function loginEmailSuccess(specs) {
	document.getElementById("loginEmailLoginDiv").classList.add("border-gray-400","focus-within:border-primary","focus-within:ring-primary");
	document.getElementById("loginEmailLoginDiv").classList.remove("pr-3.5","border-danger","focus-within:border-danger","focus-within:ring-error");
	document.getElementById("loginEmailError").innerHTML = ``
	document.getElementById("loginEmailLoginDiv").innerHTML = `${primaryLoginDiv(specs)}`;
}

function loginPasswordError(specs) {
	document.getElementById("loginPasswordLoginDiv").classList.remove("border-gray-400","focus-within:border-primary","focus-within:ring-primary");
	document.getElementById("loginPasswordLoginDiv").classList.add("pr-3.5","border-danger","focus-within:border-danger","focus-within:ring-error");
	document.getElementById("loginPasswordError").innerHTML = loginErrorMessage("Password is a required field");
	document.getElementById("loginPasswordLoginDiv").innerHTML = `${errorLoginDiv(specs)}`;
}

function loginPasswordSuccess(specs) {
	document.getElementById("loginPasswordLoginDiv").classList.add("border-gray-400","focus-within:border-primary","focus-within:ring-primary");
	document.getElementById("loginPasswordLoginDiv").classList.remove("pr-3.5","border-danger","focus-within:border-danger","focus-within:ring-error");
	document.getElementById("loginPasswordError").innerHTML = ``
	document.getElementById("loginPasswordLoginDiv").innerHTML = `${primaryLoginDiv(specs)}`;
}

function registerFirstNameError(specs) {
	document.getElementById("firstNameRegisterDiv").classList.remove("border-gray-400","focus-within:border-primary","focus-within:ring-primary");
	document.getElementById("firstNameRegisterDiv").classList.add("pr-3.5","border-danger","focus-within:border-danger","focus-within:ring-error");
	document.getElementById("firstNameError").innerHTML = registerErrorMessage("First name is a required field");
	document.getElementById("firstNameRegisterDiv").innerHTML = `${errorRegisterDiv(specs)}`;
}

function registerFirstNameSuccess(specs) {
	document.getElementById("firstNameRegisterDiv").classList.add("border-gray-400","focus-within:border-primary","focus-within:ring-primary");
	document.getElementById("firstNameRegisterDiv").classList.remove("pr-3.5","border-danger","focus-within:border-danger","focus-within:ring-error");
	document.getElementById("firstNameError").innerHTML = ``
	document.getElementById("firstNameRegisterDiv").innerHTML = `${primaryRegisterDiv(specs)}`;
}

function registerLastNameError(specs) {
	document.getElementById("lastNameRegisterDiv").classList.remove("border-gray-400","focus-within:border-primary","focus-within:ring-primary");
	document.getElementById("lastNameRegisterDiv").classList.add("pr-3.5","border-danger","focus-within:border-danger","focus-within:ring-error");
	document.getElementById("lastNameError").innerHTML = registerErrorMessage("Last name is a required field");
	document.getElementById("lastNameRegisterDiv").innerHTML =  `${errorRegisterDiv(specs)}`;
}

function registerLastNameSuccess(specs) {
	document.getElementById("lastNameRegisterDiv").classList.add("border-gray-400","focus-within:border-primary","focus-within:ring-primary");
	document.getElementById("lastNameRegisterDiv").classList.remove("pr-3.5","border-danger","focus-within:border-danger","focus-within:ring-error");
	document.getElementById("lastNameError").innerHTML = ``
	document.getElementById("lastNameRegisterDiv").innerHTML = `${primaryRegisterDiv(specs)}`;
}

function registerMobileNumberError(specs) {
	document.getElementById("mobileNumberRegisterDiv").classList.remove("border-gray-400","focus-within:border-primary","focus-within:ring-primary");
	document.getElementById("mobileNumberRegisterDiv").classList.add("pr-3.5","border-danger","focus-within:border-danger","focus-within:ring-error");
	document.getElementById("mobileNumberError").innerHTML = registerErrorMessage("11-digit Mobile number is a required field");
	document.getElementById("mobileNumberRegisterDiv").innerHTML = `${errorRegisterDiv(specs)}`;
}

function registerMobileNumberSuccess(specs) {
	document.getElementById("mobileNumberRegisterDiv").classList.add("border-gray-400","focus-within:border-primary","focus-within:ring-primary");
	document.getElementById("mobileNumberRegisterDiv").classList.remove("pr-3.5","border-danger","focus-within:border-danger","focus-within:ring-error");
	document.getElementById("mobileNumberError").innerHTML = ``
	document.getElementById("mobileNumberRegisterDiv").innerHTML = `${primaryRegisterDiv(specs)}`;
}

function registerUserEmailError(specs) {
	document.getElementById("userEmailRegisterDiv").classList.remove("border-gray-400","focus-within:border-primary","focus-within:ring-primary");
	document.getElementById("userEmailRegisterDiv").classList.add("pr-3.5","border-danger","focus-within:border-danger","focus-within:ring-error");
	document.getElementById("userEmailError").innerHTML = registerErrorMessage("Email is a required field");
	document.getElementById("userEmailRegisterDiv").innerHTML = `${errorRegisterDiv(specs)}`;
}

function registerUserEmailSuccess(specs) {
	document.getElementById("userEmailRegisterDiv").classList.add("border-gray-400","focus-within:border-primary","focus-within:ring-primary");
	document.getElementById("userEmailRegisterDiv").classList.remove("pr-3.5","border-danger","focus-within:border-danger","focus-within:ring-error");
	document.getElementById("userEmailError").innerHTML = ``
	document.getElementById("userEmailRegisterDiv").innerHTML = `${primaryRegisterDiv(specs)}`;
}

function registerUserPassword1Error(specs) {
	document.getElementById("password1RegisterDiv").classList.remove("border-gray-400","focus-within:border-primary","focus-within:ring-primary");
	document.getElementById("password1RegisterDiv").classList.add("pr-3.5","border-danger","focus-within:border-danger","focus-within:ring-error");
	document.getElementById("password1Error").innerHTML = registerErrorMessage("Should be atleast 8 characters and contain an alphanumeric and special character");
	document.getElementById("password1RegisterDiv").innerHTML = `${errorRegisterDiv(specs)}`;
}

function registerUserPassword1Success(specs) {
	document.getElementById("password1RegisterDiv").classList.add("border-gray-400","focus-within:border-primary","focus-within:ring-primary");
	document.getElementById("password1RegisterDiv").classList.remove("pr-3.5","border-danger","focus-within:border-danger","focus-within:ring-error");
	document.getElementById("password1Error").innerHTML = ``
	document.getElementById("password1RegisterDiv").innerHTML = `${primaryRegisterDiv(specs)}`;
}

function registerUserPassword2Error(specs) {
	document.getElementById("password2RegisterDiv").classList.remove("border-gray-400","focus-within:border-primary","focus-within:ring-primary");
	document.getElementById("password2RegisterDiv").classList.add("pr-3.5","border-danger","focus-within:border-danger","focus-within:ring-error");
	document.getElementById("password2Error").innerHTML = registerErrorMessage("Password entered did not match a valid password");
	document.getElementById("password2RegisterDiv").innerHTML = `${errorRegisterDiv(specs)}`;
}

function registerUserPassword2Success(specs) {
	document.getElementById("password2RegisterDiv").classList.add("border-gray-400","focus-within:border-primary","focus-within:ring-primary");
	document.getElementById("password2RegisterDiv").classList.remove("pr-3.5","border-danger","focus-within:border-danger","focus-within:ring-error");
	document.getElementById("password2Error").innerHTML = ``
	document.getElementById("password2RegisterDiv").innerHTML = `${primaryRegisterDiv(specs)}`;
}

function loginErrorMessage(message) {
    return `<p class="text-xs font-semibold leading-normal tracking-wide m-0 mt-2 text-error-dark">${message}</p>`
}

function errorLoginDiv(specs) {
    let builtDom =  
    `
        <span class="flex items-center fill-current text-error">
            <div class="py-2 pl-0 pr-2 flex items-center">
                <img src="${imageDirectory}${specs.image}" height="30">
            </div>
        </span>
        <input id="${specs.inputId}" placeholder="${specs.placeholder}" type="${specs.type}" class="w-full h-full border-none px-3.5 bg-transparent focus:outline-none resize-none" value="">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-error">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
    `
    return builtDom;
}

function primaryLoginDiv(specs) {
    let builtDom = 
    `
        <span class="flex items-center fill-current text-error">
            <div class="py-2 pl-0 pr-2 flex items-center">
                <img src="${imageDirectory}${specs.image}" height="30">
            </div>
        </span>
        <input id="${specs.inputId}" placeholder="${specs.placeholder}" type="${specs.type}" class="w-full h-full border-none px-3.5 bg-transparent focus:outline-none resize-none" value="${specs.previousValue}">
    `

	if (specs.type=="password") {
		console.log("here")
		builtDom +=
		`
			<button id="loginPasswordShowIcon" class="showPasswordIcon notShow icon-default" type="button" onclick="showLoginPassword()">
				<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="fill-current">
				<path d="M0 0h24v24H0V0z" fill="none"></path>
				<path d="M12 6c3.8 0 7.2 2.1 8.8 5.5-1.6 3.4-5 5.5-8.8 5.5s-7.2-2.1-8.8-5.5C4.8 8.1 8.2 6 12 6m0-2C7 4 2.7 7.1 1 11.5a11.8 11.8 0 0022 0C21.3 7.1 17 4 12 4zm0 5a2.5 2.5 0 110 5 2.5 2.5 0 010-5m0-2a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"></path>
				</svg>
			</button>
		`
	}
    return builtDom;
}

function registerErrorMessage(message) {
	return `<p class="text-xs font-semibold leading-normal tracking-wide m-0 mt-2 text-error-dark">${message}</p>`
}

function errorRegisterDiv(specs) {
	let builtDom = 	
	`
		<span class="flex items-center fill-current text-error">
            <div class="py-2 pl-0 pr-2 flex items-center">
                <img src="./assets/images/others/${specs.image}" height="30">
            </div>
        </span>
        <input id="${specs.inputId}" placeholder="${specs.placeholder}" type="${specs.type}" class="w-full h-full border-none px-3.5 bg-transparent focus:outline-none resize-none" value="">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-error">
        	<circle cx="12" cy="12" r="10"></circle>
        	<line x1="12" y1="8" x2="12" y2="12"></line>
        	<line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
	`
	return builtDom;
}

function primaryRegisterDiv(specs) {
	let builtDom = 
	`
		<span class="flex items-center fill-current text-error">
            <div class="py-2 pl-0 pr-2 flex items-center">
                <img src="./assets/images/others/${specs.image}" height="30">
            </div>
        </span>
        <input id="${specs.inputId}" placeholder="${specs.placeholder}" type="${specs.type}" class="w-full h-full border-none px-3.5 bg-transparent focus:outline-none resize-none" value="${specs.previousValue}">
	`

	if (specs.inputId=="password1") {
		console.log("here")
		builtDom +=
		`
			<button id="registerPassword1ShowIcon" class="showPasswordIcon notShow icon-default" type="button" onclick="showRegisterPassword1()">
				<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="fill-current">
				<path d="M0 0h24v24H0V0z" fill="none"></path>
				<path d="M12 6c3.8 0 7.2 2.1 8.8 5.5-1.6 3.4-5 5.5-8.8 5.5s-7.2-2.1-8.8-5.5C4.8 8.1 8.2 6 12 6m0-2C7 4 2.7 7.1 1 11.5a11.8 11.8 0 0022 0C21.3 7.1 17 4 12 4zm0 5a2.5 2.5 0 110 5 2.5 2.5 0 010-5m0-2a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"></path>
				</svg>
			</button>
		`
	} else if (specs.inputId=="password2") {
		console.log("here")
		builtDom +=
		`
			<button id="registerPassword2ShowIcon" class="showPasswordIcon notShow icon-default" type="button" onclick="showRegisterPassword2()">
				<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="fill-current">
				<path d="M0 0h24v24H0V0z" fill="none"></path>
				<path d="M12 6c3.8 0 7.2 2.1 8.8 5.5-1.6 3.4-5 5.5-8.8 5.5s-7.2-2.1-8.8-5.5C4.8 8.1 8.2 6 12 6m0-2C7 4 2.7 7.1 1 11.5a11.8 11.8 0 0022 0C21.3 7.1 17 4 12 4zm0 5a2.5 2.5 0 110 5 2.5 2.5 0 010-5m0-2a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"></path>
				</svg>
			</button>
		`
	}

	return builtDom;
}


function showLoginPassword() {
	if (document.getElementById("loginPasswordShowIcon").classList.contains('notShow')) {
		document.getElementById("loginPasswordShowIcon").classList.remove('notShow');
		document.getElementById("loginPasswordShowIcon").classList.add('Show');
		document.getElementById("loginPasswordShowIcon").innerHTML =
		` 
		<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="fill-current">
			<path d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"></path>
			<path d="M12 6c3.8 0 7.2 2.1 8.8 5.5a9.6 9.6 0 01-2.4 3.1l1.4 1.4c1.4-1.2 2.5-2.7 3.2-4.5a11.8 11.8 0 00-14.6-7L10 6.3l2-.2zm-1 1.1l2 2.1c.6.3 1 .7 1.3 1.3l2 2 .2-1A4.5 4.5 0 0010.9 7zM2 4l2.7 2.7c-1.6 1.2-3 3-3.7 4.9a11.8 11.8 0 0015.3 6.7l3.4 3.4 1.5-1.4L3.4 2.4 2 4zm7.5 7.5l2.6 2.6H12a2.5 2.5 0 01-2.5-2.5v-.1zM6.1 8L8 9.7c-.3.6-.4 1.2-.4 1.8a4.5 4.5 0 006.3 4.1l1 1a9.8 9.8 0 01-11.6-5.1 9.9 9.9 0 013-3.5z"></path>
		</svg>
		`
		document.getElementById("loginPassword").type = "text";
	} else {
		document.getElementById("loginPasswordShowIcon").classList.remove('Show');
		document.getElementById("loginPasswordShowIcon").classList.add('notShow');
		document.getElementById("loginPasswordShowIcon").innerHTML =
		`
		<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="fill-current">
			<path d="M0 0h24v24H0V0z" fill="none"></path>
			<path d="M12 6c3.8 0 7.2 2.1 8.8 5.5-1.6 3.4-5 5.5-8.8 5.5s-7.2-2.1-8.8-5.5C4.8 8.1 8.2 6 12 6m0-2C7 4 2.7 7.1 1 11.5a11.8 11.8 0 0022 0C21.3 7.1 17 4 12 4zm0 5a2.5 2.5 0 110 5 2.5 2.5 0 010-5m0-2a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"></path>
		</svg>
		`
		document.getElementById("loginPassword").type = "password";
	}
}

function showRegisterPassword1() {
	if (document.getElementById("registerPassword1ShowIcon").classList.contains('notShow')) {
		document.getElementById("registerPassword1ShowIcon").classList.remove('notShow');
		document.getElementById("registerPassword1ShowIcon").classList.add('Show');
		document.getElementById("registerPassword1ShowIcon").innerHTML =
		` 
		<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="fill-current">
			<path d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"></path>
			<path d="M12 6c3.8 0 7.2 2.1 8.8 5.5a9.6 9.6 0 01-2.4 3.1l1.4 1.4c1.4-1.2 2.5-2.7 3.2-4.5a11.8 11.8 0 00-14.6-7L10 6.3l2-.2zm-1 1.1l2 2.1c.6.3 1 .7 1.3 1.3l2 2 .2-1A4.5 4.5 0 0010.9 7zM2 4l2.7 2.7c-1.6 1.2-3 3-3.7 4.9a11.8 11.8 0 0015.3 6.7l3.4 3.4 1.5-1.4L3.4 2.4 2 4zm7.5 7.5l2.6 2.6H12a2.5 2.5 0 01-2.5-2.5v-.1zM6.1 8L8 9.7c-.3.6-.4 1.2-.4 1.8a4.5 4.5 0 006.3 4.1l1 1a9.8 9.8 0 01-11.6-5.1 9.9 9.9 0 013-3.5z"></path>
		</svg>
		`
		document.getElementById("password1").type = "text";
	} else {
		document.getElementById("registerPassword1ShowIcon").classList.remove('Show');
		document.getElementById("registerPassword1ShowIcon").classList.add('notShow');
		document.getElementById("registerPassword1ShowIcon").innerHTML =
		`
		<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="fill-current">
			<path d="M0 0h24v24H0V0z" fill="none"></path>
			<path d="M12 6c3.8 0 7.2 2.1 8.8 5.5-1.6 3.4-5 5.5-8.8 5.5s-7.2-2.1-8.8-5.5C4.8 8.1 8.2 6 12 6m0-2C7 4 2.7 7.1 1 11.5a11.8 11.8 0 0022 0C21.3 7.1 17 4 12 4zm0 5a2.5 2.5 0 110 5 2.5 2.5 0 010-5m0-2a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"></path>
		</svg>
		`
		document.getElementById("password1").type = "password";
	}
}

function showRegisterPassword2() {
	if (document.getElementById("registerPassword2ShowIcon").classList.contains('notShow')) {
		document.getElementById("registerPassword2ShowIcon").classList.remove('notShow');
		document.getElementById("registerPassword2ShowIcon").classList.add('Show');
		document.getElementById("registerPassword2ShowIcon").innerHTML =
		` 
		<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="fill-current">
			<path d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"></path>
			<path d="M12 6c3.8 0 7.2 2.1 8.8 5.5a9.6 9.6 0 01-2.4 3.1l1.4 1.4c1.4-1.2 2.5-2.7 3.2-4.5a11.8 11.8 0 00-14.6-7L10 6.3l2-.2zm-1 1.1l2 2.1c.6.3 1 .7 1.3 1.3l2 2 .2-1A4.5 4.5 0 0010.9 7zM2 4l2.7 2.7c-1.6 1.2-3 3-3.7 4.9a11.8 11.8 0 0015.3 6.7l3.4 3.4 1.5-1.4L3.4 2.4 2 4zm7.5 7.5l2.6 2.6H12a2.5 2.5 0 01-2.5-2.5v-.1zM6.1 8L8 9.7c-.3.6-.4 1.2-.4 1.8a4.5 4.5 0 006.3 4.1l1 1a9.8 9.8 0 01-11.6-5.1 9.9 9.9 0 013-3.5z"></path>
		</svg>
		`
		document.getElementById("password2").type = "text";
	} else {
		document.getElementById("registerPassword2ShowIcon").classList.remove('Show');
		document.getElementById("registerPassword2ShowIcon").classList.add('notShow');
		document.getElementById("registerPassword2ShowIcon").innerHTML =
		`
		<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="fill-current">
			<path d="M0 0h24v24H0V0z" fill="none"></path>
			<path d="M12 6c3.8 0 7.2 2.1 8.8 5.5-1.6 3.4-5 5.5-8.8 5.5s-7.2-2.1-8.8-5.5C4.8 8.1 8.2 6 12 6m0-2C7 4 2.7 7.1 1 11.5a11.8 11.8 0 0022 0C21.3 7.1 17 4 12 4zm0 5a2.5 2.5 0 110 5 2.5 2.5 0 010-5m0-2a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"></path>
		</svg>
		`
		document.getElementById("password2").type = "password";
	}
}


