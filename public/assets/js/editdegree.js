fetch(`https://rocky-reaches-53288.herokuapp.com/api/degrees/${localStorage.getItem("degreeId")}`, { method: 'GET', headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
.then(response => response.json())
.then(result => { 
	document.getElementById('imageFile').src = result[0].degreeImage;
	document.getElementById("imageFile").title = result[0].degreeImagePublicId;
	document.getElementById("editdegree-info").innerHTML =
		`
			<div class="styles__Content-mw8czz-4 bOaoYM">
                <div class="relative b-status-control"></div>
                <div class="styles__CollectionFormStyled-sc-1wqnqc5-0 kXUCDd">
                    <div class="editor-form">
                        <form id="editDegree" class="form-horizontal" enctype="multipart/form-data">
                            <div id="degreeTitleDiv" class="form-group form-group-lg b-input-with-label cre-inp cre-bor-reg">
                                <span class="label-help">Max 35 chars</span>
                                <span class="label-inn">
                                    <span class="text-xs font-semibold tracking-wide">
                                    	<span class="label-text">Title</span>
                                	</span>
                                </span>
                                <input id="degreeTitle" maxlength="35" class="form-control" value="${result[0].title}">
                            </div>
                            <div class="row mt-25p">
                                <div class="CollectionForm___StyledCol-lnwmgm-0 col-xs-8 cre-inp-pri cre-bor-reg mb-6">
                                    <div class="CollectionForm___StyledCol2-lnwmgm-1 iKaryF col-xs-6">
                                        <div>
                                            <div>
                                                <span class="text-lg font-semibold false">Points Required</span>
                                            </div>
                                            <input id="pointsRequired" placeholder="0" type="number" step="1" class="form-control" value="${result[0].pointsRequired}">
                                        </div>
                                    </div>
                                </div>
                                <button class="contained-error m-auto mt-6">Edit Degree</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
		`
	document.getElementById("editDegree").addEventListener("submit", (e) => { 
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
      		processing("Editing the degree");

            var formdata = new FormData();

            formdata.append("degreeImagePublicId", document.getElementById("imageFile").title);
            formdata.append("uploadedImage", imageFile); // came from upload.js
            formdata.append("degreeTitle", degreeTitle);
            formdata.append("pointsRequired", pointsRequired);

            fetch(`https://rocky-reaches-53288.herokuapp.com/api/degrees/${localStorage.getItem("degreeId")}`, {
              method: 'PUT', headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`},
              body: formdata
            })
            .then(response => response.json())
            .then(result => resultNotif("mydegrees.html",result.message,"text-success"))
            .catch(error => resultNotif("mydegrees.html",error.message,"text-error"));
      	}
	});
})
.catch(error => console.log('error', error));