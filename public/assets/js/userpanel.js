var userProfilePic;

if (localStorage.getItem("profilePic")!="undefined") {
	userProfilePic = localStorage.getItem("profilePic");
	document.getElementById("user-icon").innerHTML = 
		`
			<div class="m-2 cursor-pointer">
				<img src="${userProfilePic}" class="rounded-full bg-gray-400 mr-2" width="35" height="35">
            </div>
		`
} else {
	userProfilePic = "../assets/images/others/defaultprofilepic.svg";
	document.getElementById("user-icon").innerHTML = 
		`
			<div class="m-2 cursor-pointer">
				<img src="${userProfilePic}" class="rounded-full bg-gray-400 mr-2" width="35" height="35">
            </div>
		`
}

document.getElementById("user-icon").addEventListener('click', (e) => {
	let textUnderName, editProfileText;

	(localStorage.getItem("isAdmin")=="true") ? textUnderName = "Admin" : textUnderName = `Credit Points: ${localStorage.getItem("pointsCredited")}`; 
	(localStorage.getItem("isAdmin")=="true") ? editProfileText = "" : editProfileText = "Edit Profile"; // delete after Capstone presentation

	if (document.getElementById("user-panel").innerHTML == "") {
		document.getElementById("user-panel").innerHTML = 
			`
				<div role="tooltip" class="fixed z-20 top-14 right-2 flex width-288">
		            <div class="w-full bg-white">
		                <div class="py-2 box-shadow-style">
		                    <div class="flex p-4 cursor-pointer -mt-2 duration-200 rounded-t hover:bg-gray-100 edit-profile-button" title="Edit">
		                        <div class="flex">
		                        	<img src="${userProfilePic}" class="rounded-full bg-gray-400 mr-2" width="64" height="64">
		                            <div id="userprofiletab" class="flex ml-4 justify-center flex-col">
		                                <h6>${localStorage.getItem("firstName")}</h6>
		                                <p>${textUnderName}</p>
	                					<p class="font-normal">${editProfileText}</p>
		                            </div>
		                        </div>
		                    </div>
		                    <div class="border-b border-0 border-solid border-gray-200 mb-2"></div>
		                    <div id="logout-button" class="bg-transparent text-sm rounded-none justify-start text-black font-normal border-2 border-solid border-transparent hover:bg-gray-buttonHover tracking-normal py-3.5 px-4 h-12 focus:bg-gray-200 focus:outline-none focus:border-primary w-full flex items-center px-4" role="button" tabindex="0">
		                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="mr-6">
		                            <path d="M0 0h24v24H0V0z" fill="none"></path>
		                            <path d="M10 15.6l1.5 1.4 5-5-5-5-1.4 1.4 2.6 2.6H3v2h9.7L10 15.6zM19 3H5a2 2 0 00-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.9 2 2 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"></path>
		                        </svg>
		                        <h6 class="inline">Logout</h6>
		                    </div>
		                </div>
		            </div>
	        	</div>
			`

		if (localStorage.getItem("isAdmin")!="true") { // delete after Capstone presentation
			document.getElementById("userprofiletab").addEventListener('click', (e) => { window.location.replace("profile.html"); });
		}

		document.getElementById("logout-button").addEventListener('click', (e) => {
			localStorage.clear();
			window.location.replace("../index.html");
		});

	} else {
		document.getElementById("user-panel").innerHTML = ``
	}

});