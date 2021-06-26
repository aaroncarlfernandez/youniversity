NProgress.configure({ showSpinner: false });
NProgress.set(0.0);

fetch("https://rocky-reaches-53288.herokuapp.com/api/degrees/", { method: 'GET', headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})
.then(response => response.json())
.then(result => { loadDegrees(result); })
.catch(error => console.log('error', error));


function loadDegrees(result) { 
	for (let i = 0; i < result.length; i++) { 
		if ((localStorage.getItem("isAdmin")=="true")) {
			document.getElementById("degrees-results").innerHTML +=
				`
					<div class="col-lg-4 col-sm-6 col-xs12">
		                <div class="focus:no-underline focus:outline-none mt-4 mb-8">
		                    <div class="bg-gray-A900">
		                        <img height="155" src="${result[i].degreeImage}" class="ml-16 mr-16">
		                        <div class="flex flex-col h-50 bg-A900 text-primary-contrastText mt-2 px-4 py-2">
		                            <h2 class="text-xl font-semibold my-2 text-center" title="Path Title">${result[i].title}</h2>
		                            <div class="flex items-center justify-between mt-auto">
		                                <span class="text-base font-bold mb-0" title="Path Contents">${result[i].pointsRequired} POINTS</span>
		                                <button id="editDegree${result[i]._id}" class="editDegreeBtn flex text-white bg-transparent font-bold hover:bg-gray-A700 m-2 mr-0 ">Edit
		                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CCCBFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-right">
		                                        <line x1="5" y1="12" x2="19" y2="12"></line>
		                                        <polyline points="12 5 19 12 12 19"></polyline>
		                                    </svg>
		                                </button>
		                            </div>
		                        </div>
		                    </div>
		                </div>
		            </div>
				` 
		} else {
			if (localStorage.getItem("pointsCredited") >= result[i].pointsRequired) {
				document.getElementById("degrees-results").innerHTML +=
					`
						<div class="col-lg-4 col-sm-6 col-xs12">
			                <div class="focus:no-underline focus:outline-none mt-4 mb-8">
			                    <div class="bg-gray-A900">
			                        <img height="155" src="${result[i].degreeImage}" class="ml-16 mr-16">
			                        <div class="flex flex-col h-50 bg-A900 text-primary-contrastText mt-2 px-4 py-2">
			                            <h2 class="text-xl font-semibold my-2 text-center" title="Path Title">${result[i].title}</h2>
			                            <div class="flex items-center justify-center mt-auto">
			                                <span class="text-base font-bold mb-0 mt-4" title="Path Contents">${result[i].pointsRequired} POINTS</span>
			                            </div>
			                        </div>
			                    </div>
			                </div>
			            </div>
					` 
			} 
		}
	}

	if (document.getElementById("degrees-results").innerHTML=='') {
		document.getElementById("degrees-results").innerHTML +=
			`
				<div class="flex justify-center items-center flex-col flex-auto mt-28125">
                    <img src="../assets/images/others/diploma.JPG" loading="lazy" alt="explore courses" class="explore" width="260px" height="210px">
                    <span class="mt-8 mx-0 mb-4">Your achieved degrees will appear here</span>
                </div>
			`
	}

	editDegreeBtnLogic();
	NProgress.set(1.0);
}

function editDegreeBtnLogic() {
	let editDegreeBtn = document.getElementsByClassName("editDegreeBtn");
  
  for(let i = 0; i < editDegreeBtn.length; i++) { 

    editDegreeBtn[i].addEventListener("click", (e) => {  
      e.preventDefault();
      let degreeId = editDegreeBtn[i].id.slice(10, editDegreeBtn[i].id.length);
      localStorage.setItem("degreeId",degreeId);
      window.location.replace("editdegree.html");
    });
  }
}