let createDegree = document.getElementById("createDegree");
let imgInp = document.getElementById("imgInp").files;
let authorId = localStorage.getItem("id");

//todo: handling of no uploaded course image
createDegree.addEventListener("submit", (e) => {
    e.preventDefault();

    let degreeTitle = document.getElementById("degreeTitle").value;
    let pointsRequired = document.getElementById("pointsRequired").value;
    let validForm = true;

    if (degreeTitle == "" || degreeTitle.length > 35) {
        document.getElementById("degreeTitleDiv").classList.remove("cre-bor-reg"); 
        document.getElementById("degreeTitleDiv").classList.add("cre-bor-err");
        validForm = false;
    } else {
        document.getElementById("degreeTitleDiv").classList.remove("cre-bor-err"); 
        document.getElementById("degreeTitleDiv").classList.add("cre-bor-reg");
    }

    if (pointsRequired == "") {
        document.getElementById("pointsRequired").classList.remove("cre-bor-reg"); 
        document.getElementById("pointsRequired").classList.add("cre-bor-err");
        validForm = false;
    } else {
        document.getElementById("pointsRequired").classList.remove("cre-bor-err"); 
        document.getElementById("pointsRequired").classList.add("cre-bor-reg");
    }

    if (validForm) {
        processing("Creating the course");

        var formdata = new FormData(); 

        formdata.append("uploadedImage", imageFile); // came from upload.js
        formdata.append("title", degreeTitle);
        formdata.append("degreeAuthorId", authorId);
        formdata.append("pointsRequired", pointsRequired);

        var requestOptions = {
          method: 'POST',
          headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`},
          body: formdata
        };

        fetch("https://rocky-reaches-53288.herokuapp.com/api/degrees/create", requestOptions)
        .then(response => response.json())
        .then(result => resultNotif("mydegrees.html",result.message,"text-success"))
        .catch(error => resultNotif("mydegrees.html",result.message,"text-error"));
    }
});