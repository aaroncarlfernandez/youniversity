NProgress.configure({ showSpinner: false });
NProgress.set(0.0);
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let id = localStorage.getItem("id"); 

if (localStorage.getItem("profilePic")!="undefined") {
  document.getElementById("imageFile").src = `${localStorage.getItem("profilePic")}`;
} else {
  document.getElementById("imageFile").src = "../assets/images/others/defaultprofilepic.svg";
}
    
document.getElementById("user-info").innerHTML = 
  `
    <div>
      <div class="form-group form-group-lg b-input-with-label mt15-p10-b1">
        <span class="label-help"></span>
        <span class="label-inn">
          <span class="text-xs font-semibold tracking-wide">
            <span class="label-text">First Name</span>
          </span>
        </span>
        <input id="firstName-input" maxlength="50" type="text" class="form-control" value="${localStorage.getItem("firstName")} ">
      </div>
    </div>
    <div>
      <div class="form-group form-group-lg b-input-with-label mt15-p10-b1">
        <span class="label-inn">
          <span class="text-xs font-semibold tracking-wide">
            <span class="label-text">Last Name</span>
          </span>
        </span>
        <input id="lastName-input" maxlength="50" type="text" class="form-control" value="${localStorage.getItem("lastName")}">
      </div>
    </div>
    <div class="form-group form-group-lg b-input-with-label mt15-p10-b1">
      <span class="label-inn">
        <span class="text-xs font-semibold tracking-wide">
          <span class="label-text">Mobile Number</span>
        </span>
      </span>
      <input id="mobileNumber-input" maxlength="50" type="text" class="form-control" value="${localStorage.getItem("mobileNumber")}">
    </div>
  `

document.getElementById("updateprofile-button").addEventListener("click", (e) => {
  e.preventDefault();
  processing("Updating profile");

  let firstName = document.getElementById("firstName-input").value;
  let lastName = document.getElementById("lastName-input").value;
  let mobileNumber = document.getElementById("mobileNumber-input").value;

  var formdata = new FormData();
  formdata.append("id", localStorage.getItem("id"));
  formdata.append("firstName", firstName);
  formdata.append("lastName", lastName);
  formdata.append("mobileNumber", mobileNumber);
  formdata.append("uploadedImage", imageFile);
  formdata.append("profilePicPublicId", localStorage.getItem("profilePicPublicId"));

  fetch(`https://rocky-reaches-53288.herokuapp.com/api/users/${localStorage.getItem("id")}`, 
    { method: 'PUT', 
      headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }, 
      body: formdata})
  .then(response => response.json())
  .then(result => {
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("mobileNumber", mobileNumber);
    if (imageFile) {
      localStorage.setItem("profilePic", result.data.profilePic);
      localStorage.setItem("profilePicPublicId", result.data.profilePicPublicId);
    }
    resultNotif("profile.html",result.message,"text-success"); })
  .catch(error => resultNotif("profile.html",error.message,"text-error"));

});

document.getElementById("changepass-button").addEventListener("click", (e) => { 
    document.getElementById("__next").style = "--sidebar:0;"
    document.getElementById("s2z99").style = "z-index: 999;"
    document.getElementsByTagName('html')[0].classList.add('overflow-hidden');
    document.getElementById("right-panel").classList.remove('hide');
    document.getElementById("rightpanel-title").innerHTML= "CHANGE PASSWORD";

    document.getElementById("rightpanel-form").innerHTML = 
        `
            <div class="w-full space-y-8 mw331">
                <div class="w-full inline-flex flex-col ">
                    <div class="w-full h-12 pl-3.5 flex-auto text-sm font-normal rounded-sm cursor-text inline-flex items-center hover:bg-alphas-black06 border border-solid overflow-hidden border-gray-400 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                        <div class="-ml-3"></div>
                        <input placeholder="PASSWORD" type="password" class="w-full h-full border-none px-3.5 bg-transparent focus:outline-none resize-none" value="">
                    </div>
                    <div class="flex justify-between overflow-x-auto">
                        <div></div>
                    </div>
                </div>
                <div class="w-full inline-flex flex-col ">
                    <div class="w-full h-12 pl-3.5 flex-auto text-sm font-normal rounded-sm cursor-text inline-flex items-center hover:bg-alphas-black06 border border-solid overflow-hidden border-gray-400 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                        <div class="-ml-3"></div>
                        <input placeholder="NEW PASSWORD" name="new_password" type="password" class="w-full h-full border-none px-3.5 bg-transparent focus:outline-none resize-none" value="">
                    </div>
                    <div class="flex justify-between overflow-x-auto">
                        <div></div>
                    </div>
                </div>
                <div class="w-full inline-flex flex-col ">
                    <div class="w-full h-12 pl-3.5 flex-auto text-sm font-normal rounded-sm cursor-text inline-flex items-center hover:bg-alphas-black06 border border-solid overflow-hidden border-gray-400 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                        <div class="-ml-3"></div>
                        <input placeholder="CONFIRM PASSWORD" type="password" class="w-full h-full border-none px-3.5 bg-transparent focus:outline-none resize-none" value="">
                    </div>
                    <div class="flex justify-between overflow-x-auto">
                        <div></div>
                    </div>
                </div>
            </div>
            <div class="w-full my-8 mx-2 justify-center mw331">
                <button id="changesub-button" class="contained-primary w-full m-0" type="submit">CHANGE</button>
            </div>
        `

    document.getElementById("changesub-button").addEventListener("click", (e) => {
         e.preventDefault();
        console.log("changesub-button Clicked");
    });

});

document.getElementById("deleteacc-button").addEventListener("click", (e) => { 
    document.getElementById("__next").style = "--sidebar:0;"
    document.getElementById("s2z99").style = "z-index: 999;"
    document.getElementsByTagName('html')[0].classList.add('overflow-hidden');
    document.getElementById("right-panel").classList.remove('hide');
    document.getElementById("rightpanel-title").innerHTML= "DELETE ACCOUNT";

    let confirmationText = localStorage.getItem("firstName").toLowerCase();

    document.getElementById("rightpanel-form").innerHTML = 
        `
            <div class="w-full space-y-8 mw331">
                <h5 class="text-center mx-0">Please type <span class="main-text-color"> ${confirmationText} </span> to confirm deletion </h5>
                <div id="confirmation-input-par" class="w-full inline-flex flex-col ">
                    <div  class="w-full h-12 pl-3.5 flex-auto text-sm font-normal rounded-sm cursor-text inline-flex items-center hover:bg-alphas-black06 border border-solid overflow-hidden border-gray-400 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                        <div class="-ml-3"></div>
                        <input id="confirmation-input" type="text" class="w-full h-full border-none px-3.5 bg-transparent focus:outline-none resize-none" value="">
                    </div>
                    <div id="error-message" class="flex justify-between overflow-x-auto"></div>
                </div>
            </div>
            <div class="w-full my-8 mx-2 justify-center mw331">
                <button id="changesub-button" class="contained-primary w-full m-0" type="submit">DELETE</button>
            </div>
        `

    document.getElementById("changesub-button").addEventListener("click", (e) => {
         e.preventDefault();

         if (document.getElementById("confirmation-input").value != confirmationText) {
            document.getElementById("confirmation-input-par").innerHTML =
              `
                <div class="w-full h-12 pl-3.5 flex-auto text-sm font-normal rounded-sm cursor-text inline-flex items-center 
                hover:bg-alphas-black06 border border-solid overflow-hidden pr-3 border-error 
                focus-within:border-error focus-within:ring-1 focus-within:ring-error">
                  <div class="-ml-3"></div>
                  <input id="confirmation-input" type="text" class="w-full h-full border-none px-3.5 bg-transparent focus:outline-none resize-none" value="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="yellow" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-error">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <div id="error-message" class="flex justify-between overflow-x-auto"></div>
              `

            document.getElementById("error-message").innerHTML =
             `
              <p class="text-xs font-semibold leading-normal tracking-wide m-0 mt-2 text-error-dark">The text you entered did not match the given text</p>
             `
         } else {
          closeRightPanel ();
          fetch(`https://rocky-reaches-53288.herokuapp.com/api/users/${id}`, {
              method: 'DELETE',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
          .then(response => response.json())
          .then(result => {
            localStorage.clear();
            window.location.replace("../index.html");})
          .catch(error => resultNotif("profile.html",error.message,"text-error"));
         }
    });
});

document.getElementById("ModalCloseIcon").addEventListener("click", (e) => { closeRightPanel (); });

function closeRightPanel () {
  document.getElementById("__next").style = ""
  document.getElementById("s2z99").style = ""
  document.getElementsByTagName('html')[0].classList.remove('overflow-hidden');
  document.getElementById("right-panel").classList.add('hide');
  document.getElementById("rightpanel-form").innerHTML = ``;
}

/* DELETE THIS AFTER CAPSTONE PRESENTATION */
document.getElementById('coursepage-title').innerHTML = 
  `
    <div class="flex flex-col sm:flex-row justify-center sm:justify-start items-center mx-auto py-0 mt-8 px-4 flex-wrap " style="max-width: 1026px;">
      <span class="stroke-2 text-gray-A100 mb-2 sm:mb-0 mr-0 sm:mr-4 ml-3">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="24" fill="#F1F1FF"></circle>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19.1486 13.7612H31.6977C32.7581 13.7612 33.6177 14.6208 33.6177 15.6812C33.6177 15.8546 33.5942 16.0273 33.5478 16.1944L28.9117 32.907C28.6282 33.9288 27.5701 34.5273 26.5483 34.2439C26.4608 34.2196 26.3752 34.1892 26.292 34.1528L14.5611 29.0205C13.6535 28.6234 13.197 27.6011 13.5072 26.6603L17.3252 15.08C17.5847 14.2929 18.3199 13.7612 19.1486 13.7612Z" stroke="#5553FF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M18.24 22.08L28.8 24" stroke="#5553FF" stroke-width="1.6" stroke-linecap="square"></path>
          <path d="M17.28 24.0001L27.84 25.9201" stroke="#5553FF" stroke-width="1.6" stroke-linecap="square"></path>
          <path d="M16.3199 25.92L26.8799 27.84" stroke="#5553FF" stroke-width="1.6" stroke-linecap="square"></path>
          <path d="M20.6399 18.7201C21.1701 18.7201 21.5999 18.2903 21.5999 17.7601C21.5999 17.2299 21.1701 16.8001 20.6399 16.8001C20.1097 16.8001 19.6799 17.2299 19.6799 17.7601C19.6799 18.2903 20.1097 18.7201 20.6399 18.7201Z" stroke="#5553FF" stroke-width="1.6"></path>
        </svg>
      </span>
      <h2 class="text-xl font-semibold text-gray-A900 m-0">Courses Taken</h2>
    </div>
  `
searchCourseById(3);

NProgress.set(1.0);