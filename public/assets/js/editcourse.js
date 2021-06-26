NProgress.configure({ showSpinner: false });
NProgress.set(0.0);

let id = localStorage.getItem("id");

fetch(`https://rocky-reaches-53288.herokuapp.com/api/courses/${localStorage.getItem("courseId")}`, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }
})
  .then(response => response.json())
  .then(result => { 
    document.getElementById("imageFile").src = result[0].courseImage;
    document.getElementById("imageFile").title = result[0].courseImagePublicId;
    document.getElementById("editcourse-info").innerHTML = 
      `
          <div class="styles__Content-mw8czz-4 bOaoYM">
            <div class="relative b-status-control"></div>
            <div class="styles__CollectionFormStyled-sc-1wqnqc5-0 kXUCDd">
              <div class="editor-form">
                <form id="editCourse" class="form-horizontal" enctype="multipart/form-data">
                  <div id="courseTitleDiv" class="form-group form-group-lg b-input-with-label cre-inp cre-bor-reg">
                    <span class="label-help">Max 35 chars</span>
                    <span class="label-inn">
                      <span class="text-xs font-semibold tracking-wide">
                        <span class="label-text">Title</span>
                      </span>
                    </span>
                    <input id="courseTitle" maxlength="35" class="form-control" value="${result[0].title}">
                  </div>
                  <div id="courseDescriptionDiv" class="form-group form-group-lg b-input-with-label cre-inp cre-bor-reg">
                    <span class="label-help">Max 130 chars</span>
                    <span class="label-inn">
                      <span class="text-xs font-semibold tracking-wide">
                        <span class="label-text">Description</span>
                      </span>
                    </span>
                    <textarea id="courseDescription" maxlength="130" type="textarea" class="form-control">${result[0].description}</textarea>
                  </div>
                  <div class="row mt-25p">
                    <div class="CollectionForm___StyledCol-lnwmgm-0 col-xs-8 cre-inp-pri cre-bor-reg mb-6">
                      <div class="CollectionForm___StyledCol2-lnwmgm-1 iKaryF col-xs-6">
                        <div name="price">
                          <div>
                            <span class="text-lg font-semibold false">($) Price</span>
                          </div>
                          <input id="coursePrice" type="number" step="0.01" class="form-control" value="${result[0].price}">
                        </div>
                      </div>
                    </div>
                    <button class="contained-error m-auto mt-6">Edit Course</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
      `;

    document.getElementById("editCourse").addEventListener("submit", (e) => {
      e.preventDefault();

      let courseTitle = document.getElementById("courseTitle").value;
      let courseDescription = document.getElementById("courseDescription").value;
      let coursePrice = document.getElementById("coursePrice").value;
      let authorId = localStorage.getItem("id");
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
          processing("Editing the course");

            var formdata = new FormData();

            formdata.append("courseImagePublicId", document.getElementById("imageFile").title);
            formdata.append("uploadedImage", imageFile); // came from upload.js
            formdata.append("title", courseTitle);
            formdata.append("description", courseDescription);
            formdata.append("authorId", authorId);
            formdata.append("price", coursePrice);

            fetch(`https://rocky-reaches-53288.herokuapp.com/api/courses/${localStorage.getItem("courseId")}`, {
              method: 'PUT',
              body: formdata
            })
            .then(response => response.json())
            .then(result => resultNotif("mycourses.html",result.message,"text-success"))
            .catch(error => resultNotif("mycourses.html",error.message,"text-error"));
      }

    });

  })
  .catch(error => console.log('error', error));