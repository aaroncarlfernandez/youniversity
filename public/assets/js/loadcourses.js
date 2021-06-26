NProgress.configure({ showSpinner: false });

function loadAllCourses() {
  NProgress.set(0.0);
  fetch("https://rocky-reaches-53288.herokuapp.com/api/courses/", { method: 'GET' })
	  .then(response => response.json())
	  .then(result => { loadCourses(result); })
	  .catch(error => console.log('error', error));
}

function loadActiveCourses () {
  NProgress.set(0.0);
  fetch("https://rocky-reaches-53288.herokuapp.com/api/courses/active", 
  { method: 'GET', headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
    .then(response => response.json())
    .then(result => { loadCourses(result); })
    .catch(error => console.log('error', error));
}

function searchCourses(searchString) {
  NProgress.set(0.0);

	fetch("https://rocky-reaches-53288.herokuapp.com/api/courses/search", {
		method: 'POST',
		headers:  { 'Content-Type': 'application/json' },
		body: JSON.stringify({ "searchString": searchString })
	})
	.then(response => response.json())
	.then(result => { 
		document.getElementById("course-results").innerHTML = ``;
    if (result.length>0) {
      document.getElementById("course-results").classList.remove("justify-content-center");
      loadCourses(result);
    } else {
      document.getElementById("course-results").classList.add("justify-content-center");
      cantFind();
    }
	})
	.catch(error => console.log(error));
}

function searchCourseById(option) {
  NProgress.set(0.0);
  let targetURI = `https://rocky-reaches-53288.herokuapp.com/api/courses/${localStorage.getItem("id")}`;

  if (localStorage.getItem("isAdmin")=="true") {
    switch (option) {
      case 0:
        targetURI += `&admin&active`;
        break;
      case 1:
        targetURI += `&admin&inactive`;
        break;
      case 2:
        targetURI += `&admin&all`;
        break;
    } 
  } else {
    switch (option) {
      case 0:
        targetURI += `&user&Enrolled`;
        break;
      case 1:
        targetURI += `&user&Completed`;
        break;
      case 2:
        targetURI += `&user&Cancelled`;
        break;
      case 3:
        targetURI += `&user&All`;
        break;
    } 
  }

  fetch(targetURI, {
      method: 'GET',
      headers:  { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` } })
    .then(response => response.json())
    .then(result => { 
      document.getElementById("course-results").innerHTML = ``;
      (result.length>0) ? loadCourses(result) : noCourse(option); })
    .catch(error => console.log(error));
}

function loadCourses(result) {
  NProgress.set(0.4);
	let remItems = result.length;

	let start = 0;
	let end = 0;

	if (remItems < 6) {
		end = remItems;
	} else {
		end = 6;
	}

	remItems = remItems - 6;
  start = showCourse(result,start,end);
	
	(remItems>0) ? document.getElementById("showmore-button").classList.remove("hide") : document.getElementById("showmore-button").classList.add("hide");
	    
	document.getElementById("showmore-button").addEventListener("click", (e) => {  
	    e.preventDefault();

	    if (remItems < 6) {
	        end = end + remItems;
	    } else {
	        end = start + 6;
	    }

	    remItems = remItems - (end-start);
      start = showCourse(result,start,end);
	    (remItems>0) ? document.getElementById("showmore-button").classList.remove("hide") : document.getElementById("showmore-button").classList.add("hide");
	});

}

function showCourse(result,s,e) {
  NProgress.set(0.8);
  let authorPic;

  /*
    <div class="text-black bg-white rounded overflow-hidden flex flex-initial flex-shrink-0 transition transform hover:-translate-y-1.5 shadow-md hover:shadow-2xl duration-500 w-72 max-w-xs sm:w-80 mt-4 mb-8">
    <div class="text-black bg-white rounded overflow-hidden flex-initial flex-shrink-0 transition transform hover:-translate-y-1.5 shadow-md hover:shadow-2xl duration-500 w-72 max-w-xs sm:w-80 mt-4 mb-8">
  */

  for (let i = s; i < e; i++) { 
    (result[i].authorPic) ?  authorPic = result[i].authorPic : authorPic = "./assets/images/others/defaultprofilepic.svg";

    document.getElementById("course-results").innerHTML +=
    `
      <div class="col-lg-4 col-sm-6 col-xs12">
        <div class="text-black bg-white rounded overflow-hidden flex-initial flex-shrink-0 transition transform hover:-translate-y-1.5 shadow-md hover:shadow-2xl duration-500 mt-4 mb-8">
          <div class="focus:no-underline focus:outline-none">
            <div class="text-black">                                      
              <div class="WorkTile__CoverImg-qshkl4-1 eaqcq" style="background: url(${result[i].courseImage}) center center / cover no-repeat;">
                <button class="Price-hlix9g-0 WorkTile__Price-qshkl4-2 fOhEE useless-button">
                  <span class="text-base font-bold">$${result[i].price}</span>
                </button>
              </div>
              <div class="flex flex-col p-2 height-227">
                <div class="flex items-center w-full">
                  <img src="${authorPic}" class="rounded-full bg-gray-400 " width="30" height="30" loading="lazy" alt="">
                  <div class="flex overflow-hidden mr-auto">
                    <span class="font-normal m-2 ml-2 whitespace-nowrap overflow-hidden overflow-ellipsis">${result[i].authorfirstName} ${result[i].authorlastName}</span>
                  </div>
                </div>
                <p class="text-l m-1 font-bold course-title">${result[i].title}</p>
                <p class="font-normal">${result[i].description}</p>
                <div id="coursecard-options${i}" class="flex items-center justify-between mt-auto" style="justify-content: center;">
                  <div class="IconButtonsContainer-r4keji-0 WorkTile__IconButtonsContainer-qshkl4-13 HSCTV mb-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `

    if ((localStorage.getItem("isAdmin")=="true")) {
/*      if (result[i].isActive == true) { */
      if ((localStorage.getItem("id")==result[i].authorId) && result[i].isActive == true) { 
        document.getElementById(`coursecard-options${i}`).innerHTML = 
         `
          <div class="IconButtonsContainer-r4keji-0 WorkTile__IconButtonsContainer-qshkl4-13 HSCTV mb-2">
            <div id="studentsBtn${result[i]._id}" class="studentsBtn IconButton-sc-141h97i-0 WorkTile__IconButton-qshkl4-16 lcvbUz">
              <div class="Icon-sc-11lyzd7-0 gqgrbh"> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"></path>
                  <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"></path>
                </svg>
              </div>
              <div class="IconText-sc-1cmmg94-0 WorkTile__IconText-qshkl4-17 jPltON"> 
                <span class="font-normal">Students</span>
              </div>
            </div>
            <div id="studentsPopover-id${result[i]._id}" class="fade in styles__ConfirmPopover-h8awmp-1 fcjTi popover ml-1.5 mt-24 dspb hidden">
              <div class="popover-user-content">
                <div class="container">
                  <div id="enrolleesPanel${result[i]._id}" class="row flex justify-evenly"></div>
                </div>
                <button class="closePopoverBtn contained-error btn-xs py-2 m-4">Close</button>
              </div>
            </div>
            <div id="editBtn ${result[i]._id}" class="editBtn IconButton-sc-141h97i-0 WorkTile__IconButton-qshkl4-16 lcvbUz">
              <div class="Icon-sc-11lyzd7-0 gqgrbh"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg> 
              </div>
              <div class="IconText-sc-1cmmg94-0 WorkTile__IconText-qshkl4-17 jPltON"> 
                <span class="font-normal">Edit</span>
              </div>
            </div>
            <div class="delete-btn IconButton-sc-141h97i-0 WorkTile__IconButton-qshkl4-16 ldLUuE" id="${result[i]._id}">
              <div class="Icon-sc-11lyzd7-0 gqgrbh"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg> 
              </div>
              <div class="IconText-sc-1cmmg94-0 WorkTile__IconText-qshkl4-17 jPltON"> 
                <span class="font-normal">Delete</span>
              </div>
            </div>
            <div id="popover-id${result[i]._id}" class="fade in styles__ConfirmPopover-h8awmp-1 fcjTi popover ml-1.5 mt-24 dspb hidden">
              <h3 class="popover-title">Permanently delete this course?</h3>
              <div class="popover-content">
                <button id="confirmDeleteBtn${result[i]._id}" class="confirmDeleteBtn contained-error py-2 m-2">YES</button>
                <button class="cancelDeleteBtn text-default py-2 m-2">CANCEL</button>
              </div>
            </div>
            <div class="activate-btn IconButton-sc-141h97i-0 ldLUuE">
              <div class="activateBtnDiv">
                <input class="activateBtnInput activatedMode" id="activateToggle${result[i]._id}" type="checkbox" name="${result[i]._id}" checked/><label class="activateBtnLabel" for="activateToggle${result[i]._id}">Toggle</label>
              </div>
              <div>
                <span class="activateBtnText font-normal">Active</span>
              </div>
            </div>
          </div> 
         `

/*      } else if (result[i].isActive == false) {*/
      } else if ((localStorage.getItem("id")==result[i].authorId) && result[i].isActive == false) {
        document.getElementById(`coursecard-options${i}`).innerHTML = 
          `
            <div class="IconButtonsContainer-r4keji-0 WorkTile__IconButtonsContainer-qshkl4-13 HSCTV mb-2">
              <div id="editBtn ${result[i]._id}" class="editBtn IconButton-sc-141h97i-0 WorkTile__IconButton-qshkl4-16 lcvbUz">
                <div class="Icon-sc-11lyzd7-0 gqgrbh"> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg> 
                </div>
                <div class="IconText-sc-1cmmg94-0 WorkTile__IconText-qshkl4-17 jPltON"> 
                  <span class="font-normal">Edit </span>
                </div>
              </div>
              <div class="activate-btn IconButton-sc-141h97i-0 ldLUuE">
                <div class="activateBtnDiv">
                  <input class="activateBtnInput deactivatedMode" id="activateToggle${result[i]._id}" type="checkbox" name="${result[i]._id}" /><label class="activateBtnLabel" for="activateToggle${result[i]._id}">Toggle</label>
                </div>
                <div>
                  <span class="activateBtnText font-normal">Deactivated</span>
                </div>
              </div>
            </div>
          `
      }

    } else if ( currPage=="index.html" || currPage=="" || (currPage=="courses.html" && localStorage.getItem("isAdmin")=="false")) {
      document.getElementById(`coursecard-options${i}`).innerHTML =
        `
          <div class="flex flex-col items-start">
            <fieldset id="ratingFs${result[i]._id}" class="rating-fieldset rating">
              <input type="radio" id="star5w${result[i]._id}" name="rating${result[i]._id}" value="5"  /><label class = "full mini-star no-hover"  title="Awesome - 5 stars"></label>
              <input type="radio" id="star4h${result[i]._id}" name="rating${result[i]._id}" value="4.5" /><label class="half mini-star no-hover"  title="Pretty good - 4.5 stars"></label>
              <input type="radio" id="star4w${result[i]._id}" name="rating${result[i]._id}" value="4" /><label class = "full mini-star no-hover"  title="Pretty good - 4 stars"></label>
              <input type="radio" id="star3h${result[i]._id}" name="rating${result[i]._id}" value="3.5" /><label class="half mini-star no-hover"  title="Meh - 3.5 stars"></label>
              <input type="radio" id="star3w${result[i]._id}" name="rating${result[i]._id}" value="3" /><label class = "full mini-star no-hover"  title="Meh - 3 stars"></label>
              <input type="radio" id="star2h${result[i]._id}" name="rating${result[i]._id}" value="2.5"/><label class="half mini-star no-hover"  title="Kinda bad - 2.5 stars"></label>
              <input type="radio" id="star2w${result[i]._id}" name="rating${result[i]._id}" value="2" /><label class = "full mini-star no-hover"  title="Kinda bad - 2 stars"></label>
              <input type="radio" id="star1h${result[i]._id}" name="rating${result[i]._id}" value="1.5" /><label class="half mini-star no-hover"  title="Meh - 1.5 stars"></label>
              <input type="radio" id="star1w${result[i]._id}" name="rating${result[i]._id}" value="1" /><label class = "full mini-star no-hover"  title="Sucks big time - 1 star"></label>
              <input type="radio" id="star0h${result[i]._id}" name="rating${result[i]._id}" value="0.5" /><label class="half mini-star no-hover"  title="Sucks big time - 0.5 stars"></label>
            </fieldset>
            <div class="text-xs font-semibold tracking-wider ml-1 leading-5">${result[i].ratingCount} ratings</div>
          </div>

          <button class="ml-auto text-default enroll-btn" value="${result[i]._id}">Enroll
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5553FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-right text-primary">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        `
        
      if (result[i].rating > 0 && result[i].rating <= 0.5) {
        document.getElementById(`star0h${result[i]._id}`).setAttribute("checked", "checked");
      } else if (result[i].rating > 0.5 && result[i].rating <= 1) {
        document.getElementById(`star1w${result[i]._id}`).setAttribute("checked", "checked");
      } else if (result[i].rating > 1 && result[i].rating <= 1.5) {
        document.getElementById(`star1h${result[i]._id}`).setAttribute("checked", "checked");
      } else if (result[i].rating > 1.5 && result[i].rating <= 2) {
        document.getElementById(`star2w${result[i]._id}`).setAttribute("checked", "checked");
      } else if (result[i].rating > 2 && result[i].rating <= 2.5) {
        document.getElementById(`star2h${result[i]._id}`).setAttribute("checked", "checked");
      } else if (result[i].rating > 2.5 && result[i].rating <= 3) {
        document.getElementById(`star3w${result[i]._id}`).setAttribute("checked", "checked");
      } else if (result[i].rating > 3 && result[i].rating <= 3.5) {
        document.getElementById(`star3h${result[i]._id}`).setAttribute("checked", "checked");
      } else if (result[i].rating > 3.5 && result[i].rating <= 4) {
        document.getElementById(`star4w${result[i]._id}`).setAttribute("checked", "checked");
      } else if (result[i].rating > 4 && result[i].rating <= 4.5) {
        document.getElementById(`star4h${result[i]._id}`).setAttribute("checked", "checked");
      } else if (result[i].rating > 4.5 && result[i].rating <= 5) {
        document.getElementById(`star5w${result[i]._id}`).setAttribute("checked", "checked");
      }

    } else if (currPage=="mycourses.html" && localStorage.getItem("isAdmin")=="false" && result[i].enrollmentStatus == "Enrolled") {
      document.getElementById(`coursecard-options${i}`).innerHTML =
        `
          <div class="IconButtonsContainer-r4keji-0 WorkTile__IconButtonsContainer-qshkl4-13 HSCTV mb-2">
            <div class="complete-btn IconButton-sc-141h97i-0 WorkTile__IconButton-qshkl4-16 ldLUuE2" title="${result[i]._id}">
              <div class="Icon-sc-11lyzd7-0 gqgrbh"> 
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.2 7.1L10 .5l2.8 6.6 7.2.6-5.5 4.8 1.7 7-6.2-3.7-6.2 3.7 1.7-7L0 7.7l7.2-.6zM11 8l-1-2.3L9 8 8.6 9l-1.2.1-2.5.2L6.8 11l.9.8-.3 1.2-.6 2.4L9 14l1-.6 1 .7 2.2 1.3-.6-2.5-.3-1.1 1-.8L15 9.3l-2.5-.2h-1.2L11 7.8z" fill="#6B6A78"></path>
                </svg>
              </div>
              <div class="IconText-sc-1cmmg94-0 WorkTile__IconText-qshkl4-17 jPltON"> 
                <span class="font-normal">Complete </span>
              </div>
            </div>
            <div class="cancel-btn IconButton-sc-141h97i-0 WorkTile__IconButton-qshkl4-16 ldLUuE" title="${result[i]._id}">
              <div class="Icon-sc-11lyzd7-0 gqgrbh">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM4 8H20V6H4V8Z" fill="#6B6A78"></path>
                  <line x1="1.59297" y1="2.70708" x2="20.6849" y2="21.799" stroke="#6B6A78" stroke-width="2"></line>
                  <line x1="3.00716" y1="1.29289" x2="22.099" y2="20.3848" stroke="white" stroke-width="2"></line>
                </svg>
              </div>
              <div class="IconText-sc-1cmmg94-0 WorkTile__IconText-qshkl4-17 jPltON"> 
                <span class="font-normal">Cancel </span>
              </div>
            </div>
          </div>
        `
    } else if (currPage=="mycourses.html" && localStorage.getItem("isAdmin")=="false" && result[i].enrollmentStatus == "Cancelled") {
      document.getElementById(`coursecard-options${i}`).innerHTML =
        `
          <div class="IconButtonsContainer-r4keji-0 WorkTile__IconButtonsContainer-qshkl4-13 HSCTV mb-2">
            <div class="reenroll-btn IconButton-sc-141h97i-0 WorkTile__IconButton-qshkl4-16 lcvbUz" title="${result[i]._id}">
              <div class="Icon-sc-11lyzd7-0 gqgrbh2"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
              <div class="IconText-sc-1cmmg94-0 WorkTile__IconText-qshkl4-17 jPltON"> 
                <span class="font-normal">Reenroll</span>
              </div>
            </div>
          </div>
        `
    } else if (currPage=="mycourses.html" && localStorage.getItem("isAdmin")=="false" && result[i].enrollmentStatus == "Completed") {


      document.getElementById(`coursecard-options${i}`).innerHTML =
      `
        <fieldset id="ratingFs${result[i]._id}" class="rating-fieldset rating">
          <input type="radio" id="star5w${result[i]._id}" name="rating${result[i]._id}" value="5" /><label class = "full regular-star" for="star5w${result[i]._id}" title="Awesome - 5 stars"></label>
          <input type="radio" id="star4h${result[i]._id}" name="rating${result[i]._id}" value="4.5" /><label class="half regular-star" for="star4h${result[i]._id}" title="Pretty good - 4.5 stars"></label>
          <input type="radio" id="star4w${result[i]._id}" name="rating${result[i]._id}" value="4" /><label class = "full regular-star" for="star4w${result[i]._id}" title="Pretty good - 4 stars"></label>
          <input type="radio" id="star3h${result[i]._id}" name="rating${result[i]._id}" value="3.5" /><label class="half regular-star" for="star3h${result[i]._id}" title="Meh - 3.5 stars"></label>
          <input type="radio" id="star3w${result[i]._id}" name="rating${result[i]._id}" value="3" /><label class = "full regular-star" for="star3w${result[i]._id}" title="Meh - 3 stars"></label>
          <input type="radio" id="star2h${result[i]._id}" name="rating${result[i]._id}" value="2.5" /><label class="half regular-star" for="star2h${result[i]._id}" title="Kinda bad - 2.5 stars"></label>
          <input type="radio" id="star2w${result[i]._id}" name="rating${result[i]._id}" value="2" /><label class = "full regular-star" for="star2w${result[i]._id}" title="Kinda bad - 2 stars"></label>
          <input type="radio" id="star1h${result[i]._id}" name="rating${result[i]._id}" value="1.5" /><label class="half regular-star" for="star1h${result[i]._id}" title="Meh - 1.5 stars"></label>
          <input type="radio" id="star1w${result[i]._id}" name="rating${result[i]._id}" value="1" /><label class = "full regular-star" for="star1w${result[i]._id}" title="Sucks big time - 1 star"></label>
          <input type="radio" id="star0h${result[i]._id}" name="rating${result[i]._id}" value="0.5" /><label class="half regular-star" for="star0h${result[i]._id}" title="Sucks big time - 0.5 stars"></label>
        </fieldset>
      `
      switch (result[i].enrollmentRating) {
        case 0.5:
          document.getElementById(`star0h${result[i]._id}`).setAttribute("checked", "checked");
          break;
        case 1.0:
          document.getElementById(`star1w${result[i]._id}`).setAttribute("checked", "checked");
          break;
        case 1.5:
          document.getElementById(`star1h${result[i]._id}`).setAttribute("checked", "checked");
          break;
        case 2.0:
          document.getElementById(`star2w${result[i]._id}`).setAttribute("checked", "checked");
          break;
        case 2.5:
          document.getElementById(`star2h${result[i]._id}`).setAttribute("checked", "checked");
          break;
        case 3.0:
          document.getElementById(`star3w${result[i]._id}`).setAttribute("checked", "checked");
          break;
        case 3.5:
          document.getElementById(`star3h${result[i]._id}`).setAttribute("checked", "checked");
          break;
        case 4.0:
          document.getElementById(`star4w${result[i]._id}`).setAttribute("checked", "checked");
          break;
        case 4.5:
          document.getElementById(`star4h${result[i]._id}`).setAttribute("checked", "checked");
          break;
        case 5.0:
          document.getElementById(`star5w${result[i]._id}`).setAttribute("checked", "checked");
          break;
      }

    }
  }

  uselessBtnLogic();
  studentsBtnLogic();
  enrollBtnLogic();
  editBtnLogic();
  deleteBtnLogic();
  activatedModeLogic();
  deactivatedModeLogic();
  completeBtnLogic();
  cancelBtnLogic();
  reenrollBtnLogic();
  ratingLogic();

  NProgress.set(1.0);
  return e
}

function ratingLogic() {
  let ratingFieldsets = document.getElementsByClassName("rating-fieldset");

  for(let i = 0; i < ratingFieldsets.length; i++){
    ratingFieldsets[i].addEventListener("change", (e) => {  
      e.preventDefault();

      const ratingButtons = document.querySelectorAll(`input[name="rating${ratingFieldsets[i].id.slice(8,ratingFieldsets[i].id.length)}"]`);
      let ratingValue = 0;

      for (const ratingButton of ratingButtons) {
        if (ratingButton.checked) {
          ratingValue = ratingButton.value;
          break;
        }
      }

      fetch(`https://rocky-reaches-53288.herokuapp.com/api/courses/enrollee/?&field=rating&courseid=${ratingFieldsets[i].id.slice(8,ratingFieldsets[i].id.length)}&enrolleeid=${localStorage.getItem("id")}&arg=${ratingValue}`, 
      { method: 'PUT', headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
      .then(response => response.json())
      .then(result => notifNoReplace(result.message,"text-success"))
      .catch(error => notifNoReplace(error.message,"text-error"));
    });
  }
}

function uselessBtnLogic() {
  let uselessBtn = document.getElementsByClassName("useless-button");

  for(let i = 0; i < uselessBtn.length; i++){
    uselessBtn[i].addEventListener("click", (e) => {  
      e.preventDefault();
    });
  }
}

function studentsBtnLogic() { 
  let studentsBtn = document.getElementsByClassName("studentsBtn");
  let closePopoverBtn = document.getElementsByClassName("closePopoverBtn");

  for(let i = 0; i < studentsBtn.length; i++) { 

    studentsBtn[i].addEventListener("click", (e) => {  
      e.preventDefault();
      document.getElementById(`studentsPopover-id${studentsBtn[i].id.slice(11,studentsBtn[i].id.length)}`).classList.toggle("hidden");
      buildEnrolleesPanel(studentsBtn[i].id.slice(11,studentsBtn[i].id.length));
    });

    closePopoverBtn[i].addEventListener("click", (e) => {  
      e.preventDefault();
      document.getElementById(`studentsPopover-id${studentsBtn[i].id.slice(11,studentsBtn[i].id.length)}`).classList.toggle("hidden");
    });
  }
}

function buildEnrolleesPanel(courseId) {
  fetch(`https://rocky-reaches-53288.herokuapp.com/api/courses/enrollees/${courseId}`, { method: 'GET', headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
  .then(response => response.json())
  .then(result => {
    document.getElementById(`enrolleesPanel${courseId}`).innerHTML = "";
    let userPic;

    if (result.length === 0) {
      document.getElementById(`enrolleesPanel${courseId}`).innerHTML +=
      `
        <div class="text-center col-lg-12 col-xs-12"> No student enrolled yet</div>
      `
    } else {
      for (let i=0; i<result.length; i++) {
        (result[i].enrolleePic) ? userPic = result[i].enrolleePic : userPic = "../assets/images/others/defaultprofilepic.svg";
        document.getElementById(`enrolleesPanel${courseId}`).innerHTML +=
          `
            <div class="col-lg-2 col-xs-2 mb-2 remove-plr">
              <img src="${userPic}" class="rounded-full bg-gray-400 " widthHeight = width="30" height="30" loading="lazy" alt="" title="${result[i].enrolleeFirstName} ${result[i].enrolleeLastName}">
            </div>
          `
      }
    }
  })
  .catch(error => notifNoReplace(error.message,"text-error"));
}

function editBtnLogic() {
  let editBtn = document.getElementsByClassName("editBtn");
  
  for(let i = 0; i < editBtn.length; i++) { 

    editBtn[i].addEventListener("click", (e) => {  
      e.preventDefault();
      let courseId = editBtn[i].id.slice(8, editBtn[i].id.length);
      localStorage.setItem("courseId",courseId);
      window.location.replace("editcourse.html");
    });
  }
}

function deleteBtnLogic() {
  let deleteBtn = document.getElementsByClassName("delete-btn");
  let cancelDeleteBtn = document.getElementsByClassName("cancelDeleteBtn");
  let confirmDeleteBtn = document.getElementsByClassName("confirmDeleteBtn");

  for(let i = 0; i < deleteBtn.length; i++) { 

    deleteBtn[i].addEventListener("click", (e) => {  
      e.preventDefault();
      document.getElementById(`popover-id${deleteBtn[i].id}`).classList.toggle("hidden");
    });

    cancelDeleteBtn[i].addEventListener("click", (e) => {  
      e.preventDefault();
      document.getElementById(`popover-id${deleteBtn[i].id}`).classList.toggle("hidden");
    });

    confirmDeleteBtn[i].addEventListener("click", (e) => {  
      e.preventDefault();
      let courseId = confirmDeleteBtn[i].id.slice(16, confirmDeleteBtn[i].id.length);
      deleteCourse(courseId);
    });
  }

}

function activatedModeLogic() {
  let activatedMode = document.getElementsByClassName("activatedMode");
  
  for(let i = 0; i < activatedMode.length; i++) { 

    activatedMode[i].addEventListener("click", (e) => {  
      e.preventDefault();
      deactivateCourse(activatedMode[i].name);
    });
  }
}

function deactivatedModeLogic() {
  let deactivatedMode = document.getElementsByClassName("deactivatedMode");
  
  for(let i = 0; i < deactivatedMode.length; i++) { 

    deactivatedMode[i].addEventListener("click", (e) => {  
      e.preventDefault();
      activateCourse(deactivatedMode[i].name);
    });
  }
}


function enrollBtnLogic() {
  let enrollBtn = document.getElementsByClassName("enroll-btn");
  let courseTitle = document.getElementsByClassName("course-title");

  for(let i = 0; i < enrollBtn.length; i++){ 

    enrollBtn[i].addEventListener("click", (e) => {  
      e.preventDefault();

      if (localStorage.length===0) {
        document.getElementById("login-page").classList.remove("hide");
        document.documentElement.classList.add("overflow-hidden");
      } else if (localStorage.getItem("isAdmin") !="true") {
        enrollCourse(enrollBtn[i].value,courseTitle[i].innerHTML);
      }

    });
  }
}

function completeBtnLogic() {
  let completeBtn = document.getElementsByClassName("complete-btn");

  for(let i = 0; i < completeBtn.length; i++) { 

    completeBtn[i].addEventListener("click", (e) => {  
      e.preventDefault();
      changeEnrolleeStatus(completeBtn[i].title,'Completed');
    });
  }
}

function cancelBtnLogic() {
  let cancelBtn = document.getElementsByClassName("cancel-btn");

  for(let i = 0; i < cancelBtn.length; i++) { 

    cancelBtn[i].addEventListener("click", (e) => {  
      e.preventDefault();
      changeEnrolleeStatus(cancelBtn[i].title,'Cancelled');
    });
  }
}

function reenrollBtnLogic() {
  let reenrollBtn = document.getElementsByClassName("reenroll-btn");

  for(let i = 0; i < reenrollBtn.length; i++) { 

    reenrollBtn[i].addEventListener("click", (e) => {  
      e.preventDefault();
      changeEnrolleeStatus(reenrollBtn[i].title,'Enrolled');
    });
  }
}

function deactivateCourse(courseId) {
  processing("Deactivating course..");
  fetch(`https://rocky-reaches-53288.herokuapp.com/api/courses/deactivate/${courseId}`, { method: 'PUT', headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
  .then(response => response.json())
  .then(result => (currPage=="mycourses.html") ? notifReplaceTab( {specs:{active:1, deactivatedTabs:[0,2]}, message: result.message, textStyle:"text-success" }) : resultNotif(currPage,result.message,"text-success"))
  .catch(error => notifNoReplace(error.message,"text-error"));

}

function activateCourse(courseId) {
  processing("Activating course..");
  fetch(`https://rocky-reaches-53288.herokuapp.com/api/courses/activate/${courseId}`, { method: 'PUT', headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`} })
  .then(response => response.json())
  .then(result => (currPage=="mycourses.html") ? notifReplaceTab( {specs:{active:0, deactivatedTabs:[1,2]}, message: result.message, textStyle:"text-success" }) : resultNotif(currPage,result.message,"text-success"))
  .catch(error => notifNoReplace(error.message,"text-error"));
}

function enrollCourse(courseId,courseTitle) {
  processing("Enrolling " + courseTitle);

  fetch("https://rocky-reaches-53288.herokuapp.com/api/courses/enroll", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
      body: JSON.stringify({
        "id": courseId,
        "userId": localStorage.getItem("id")
      })
  })
  .then(response => response.json())
  .then(result => {
    if (result.status===200) {
      resultNotif("mycourses.html",result.message,"text-success");
      // window.location.replace("mycourses.html");
    } else {
      notifNoReplace(result.message,"text-error");
    }
  });
}

function changeEnrolleeStatus(courseId,statusToBe) {
  let active, deactivatedTabs;
  switch (statusToBe) {
    case 'Completed':
      processing("Completing the course..");
      active = 1;
      deactivatedTabs = [0,2];
      break;
    case 'Cancelled':
      processing("Cancelling the course..");
      active = 2;
      deactivatedTabs = [0,1];
      break;
    case 'Enrolled':
      processing("Enrolling the course..");
      active = 0;
      deactivatedTabs = [1,2];
      break;
  }
  
  fetch(`https://rocky-reaches-53288.herokuapp.com/api/courses/enrollee/?&field=status&courseid=${courseId}&enrolleeid=${localStorage.getItem("id")}&arg=${statusToBe}`, { method: 'PUT', headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`} })
  .then(response => response.json())
  .then(result => {
    if (statusToBe=='Completed') {
      let accumPointsCredited = parseInt(localStorage.getItem('pointsCredited')) + 5;
      localStorage.setItem('pointsCredited', accumPointsCredited);
    }
    notifReplaceTab( {specs:{active:active, deactivatedTabs:deactivatedTabs}, message: result.message, textStyle:"text-success" })
  })
  .catch(error => resultNotif("mycourses.html",error.message,"text-error"));
}

function deleteCourse(courseId) {
  processing("Deleting course..");
  fetch(`https://rocky-reaches-53288.herokuapp.com/api/courses/${courseId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`} })
  .then(response => response.json())
  .then(result => resultNotif("mycourses.html",result.message,"text-success"))
  .catch(error => resultNotif("mycourses.html",error.message,"text-error"));
}

function cantFind() {
  NProgress.set(1.0);
	document.getElementById("showmore-button").classList.add("hide");
	document.getElementById("course-results").innerHTML =
		`
			<div class="flex flex-col items-center text-center mt-8">
				<img src="https://res.cloudinary.com/dyogexlcd/image/upload/v1618703304/cantfind_ygpytm.svg" loading="lazy">
				<h5>We may not have the course that you are looking for</h5>
				<h6>Try searching again with a different keyword </h6>
			</div
		`
}

function noCourse(option) {
  NProgress.set(1.0);
  document.getElementById("showmore-button").classList.add("hide");
  let noCourseMessage;
  if (localStorage.getItem("isAdmin")=="true") {
    switch (option) {
      case 0:
        noCourseMessage = "Your active courses will appear here";
        break;
      case 1:
        noCourseMessage = "Your deactivated courses will appear here";
        break;
      case 2:
        noCourseMessage = "All the courses you created will appear here";
        break;
    } 
  } else {
    switch (option) {
      case 0:
        noCourseMessage = "Your enrolled courses will appear here";
        break;
      case 1:
        noCourseMessage = "Your completed courses will appear here";
        break;
      case 2:
        noCourseMessage = "Your cancelled courses will appear here";
        break;
      case 3:
        noCourseMessage = "All the courses that you have taken will appear here";
        break;
    } 
  }
  document.getElementById("course-results").innerHTML =
    `
      <div class="flex justify-center items-center flex-col flex-auto mt-28125">
        <img src="../assets/images/others/saveCoursesImage.svg" loading="lazy" alt="explore courses" class="explore" width="260px" height="210px">
        <span class="mt-8 mx-0 mb-4">${noCourseMessage}</span>
      </div>
    `
}