let loginForm = document.getElementById("loginUser");
let imageDirectory, loginTargetUrl;

if (currPage=="" || currPage=="index.html") {
    imageDirectory = "./assets/images/others/"
    loginTargetUrl = "pages/mycourses.html";
} else {
    imageDirectory = "../assets/images/others/";
    loginTargetUrl = "./mycourses.html";
}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let loginEmail = document.getElementById("loginEmail").value;
    let loginPassword = document.getElementById("loginPassword").value;
    let validForm = true;
    
    if (loginEmail.length<=0) { 
        validForm = false;
        let specs = {
            image: "email.svg",
            inputId: "loginEmail",
            placeholder: "Email",
            type: "email"
        }
        loginEmailError(specs);
    } else {
        let specs = {
            image: "email.svg",
            inputId: "loginEmail",
            placeholder: "Email",
            type: "email",
            previousValue: loginEmail
        }
        loginEmailSuccess(specs);
    }

    if (loginPassword.length<=0) { 
        validForm = false;
        let specs = {
            image: "password.svg",
            inputId: "loginPassword",
            placeholder: "Password",
            type: "password"
        }
        loginPasswordError(specs);
    } else {
        let specs = {
            image: "password.svg",
            inputId: "loginPassword",
            placeholder: "Password",
            type: "password",
            previousValue: loginPassword
        }
        loginPasswordSuccess(specs);
    }

    if (validForm) {
        document.getElementById("loginStatus").innerHTML = 
        `
            <div class=" flex items-center justify-center text-center undefined">
                <div class="styles__Spinner-sc-1yksbqq-2 ca-anim"></div>
                <span class="pl-1.5 text-utils-loader pt-px">Checking your credentials...</span>
            </div>
        `
        fetch("https://rocky-reaches-53288.herokuapp.com/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword
            })
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            if (data.accessToken){
                document.getElementById("loginStatus").innerHTML = 
                `
                    <div class=" flex items-center justify-center text-center undefined">
                        <div class="styles__Spinner-sc-1yksbqq-2 ca-anim"></div>
                        <span class="pl-1.5 text-utils-loader pt-px">Credentials validated. Logging you in...</span>
                    </div>
                `
                localStorage.setItem("accessToken", data.accessToken);

                fetch("https://rocky-reaches-53288.herokuapp.com/api/users/details", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${data.accessToken}`
                    }
                })
                .then( res => {
                    return res.json()
                })
                .then(data => {
                    localStorage.setItem("id", data._id);
                    localStorage.setItem("email", data.email);
                    localStorage.setItem("firstName", data.firstName);
                    localStorage.setItem("lastName", data.lastName);
                    localStorage.setItem("isAdmin", data.isAdmin);
                    localStorage.setItem("mobileNumber", data.mobileNumber);
                    localStorage.setItem("profilePic", data.profilePic);
                    localStorage.setItem("profilePicPublicId", data.profilePicPublicId);
                    localStorage.setItem("pointsCredited", data.pointsCredited);
                    window.location.replace(`${loginTargetUrl}`);
                })
            } else {
                document.getElementById("loginStatus").innerHTML = 
                    `
                        <div class="py-0 px-4 h-full flex items-center justify-center text-center bg-white text-error">
                            <span>Failed to validate credentials. Please check your email and/or password.</span>
                        </div>
                    `
            }
        })
        .catch (error => {
            document.getElementById("loginStatus").innerHTML = 
            `
                <div class="py-0 px-4 h-full flex items-center justify-center text-center bg-white text-error">
                    <span>Something went wrong. Please try again later.</span>
                </div>
            `
        })
    }
})
