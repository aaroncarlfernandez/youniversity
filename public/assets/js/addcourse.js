let createCourse = document.getElementById("createCourse");
let imgInp = document.getElementById("imgInp").files;
let authorId = localStorage.getItem("id");

//todo: handling of no uploaded course image
createCourse.addEventListener("submit", (e) => {
    e.preventDefault();

    let courseTitle = document.getElementById("courseTitle").value;
    let courseDescription = document.getElementById("courseDescription").value;
    let coursePrice = document.getElementById("coursePrice").value;
    let validForm = true;

    if (courseTitle == "" || courseTitle.length > 35) {
        document.getElementById("courseTitleDiv").classList.remove("cre-bor-reg"); 
        document.getElementById("courseTitleDiv").classList.add("cre-bor-err");
        validForm = false;
    } else {
        document.getElementById("courseTitleDiv").classList.remove("cre-bor-err"); 
        document.getElementById("courseTitleDiv").classList.add("cre-bor-reg");
    }

    if (courseDescription == "" || courseTitle.length > 130) {
        document.getElementById("courseDescriptionDiv").classList.remove("cre-bor-reg"); 
        document.getElementById("courseDescriptionDiv").classList.add("cre-bor-err");
        validForm = false;
    } else {
        document.getElementById("courseDescriptionDiv").classList.remove("cre-bor-err"); 
        document.getElementById("courseDescriptionDiv").classList.add("cre-bor-reg");
    }

    if (coursePrice == "") {
        console.log("Failed: " + typeof coursePrice);
        document.getElementById("coursePrice").classList.remove("cre-bor-reg"); 
        document.getElementById("coursePrice").classList.add("cre-bor-err");
        validForm = false;
    } else {
        document.getElementById("coursePrice").classList.remove("cre-bor-err"); 
        document.getElementById("coursePrice").classList.add("cre-bor-reg");
    }

    if (validForm) {
        processing("Checking the course title");

        console.log(localStorage.getItem("accessToken"))

        fetch(`https://rocky-reaches-53288.herokuapp.com/api/courses/course-exists/?title=${courseTitle}`, 
        {
            method: 'GET',
            headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
        })
        .then(response => response.json())
        .then(result => {
            if (result === true) {
                notifNoReplace("Course title already exists","text-error");
            } else {
                processing("Creating the course");
                var formdata = new FormData(); 

                formdata.append("uploadedImage", imageFile); // came from upload.js
                formdata.append("title", courseTitle);
                formdata.append("description", courseDescription);
                formdata.append("authorId", authorId);
                formdata.append("price", coursePrice);
        
                fetch("https://rocky-reaches-53288.herokuapp.com/api/courses/create", {
                    method: 'POST',
                    headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`},
                    body: formdata
                })
                .then(response => response.json())
                .then(result => resultNotif("mycourses.html",result.message,"text-success"))
                .catch(error => resultNotif("mycourses.html",error.message,"text-error"));
            }
        })
        .catch(error => resultNotif("mycourses.html",error.message,"text-error"));
    }
});