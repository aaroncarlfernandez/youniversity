loadItems(); 

if (localStorage.getItem("isAdmin")=="true") {
	showCreateButton ();
}

function loadItems() {
		document.getElementById("nav-sidebar").innerHTML = 
		`
				<a id="dashboardsb-icon" href="courses.html" class="hover:no-underline focus:no-underline flex flex-col items-center w-full cursor-pointer py-3 px-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-2 w-6 h-6">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <span class="text-xs font-semibold tracking-wide">Explore</span>
                </a>
        `

        if (currPage==currentPage(document.getElementById("dashboardsb-icon").href)) {
        	document.getElementById("dashboardsb-icon").classList.remove("hover:bg-gray-200", "text-black", "hover:text-black", "focus:text-white", "focus:text-black");
        	document.getElementById("dashboardsb-icon").classList.add("bg-gray-A700", "hover:bg-gray-A900", "hover:text-white", "focus:text-white", "text-white");

        } else {
        	document.getElementById("dashboardsb-icon").classList.remove("bg-gray-A700", "hover:bg-gray-A900", "hover:text-white", "focus:text-white", "text-white");
        	document.getElementById("dashboardsb-icon").classList.add("hover:bg-gray-200", "text-black", "hover:text-black", "focus:text-white", "focus:text-black");
        }

		document.getElementById("nav-sidebar").innerHTML +=
		`
			<a id="coursessb-icon" href="mycourses.html" class="hover:no-underline focus:no-underline flex flex-col items-center w-full cursor-pointer py-3 px-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-2 w-6 h-6">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                <span class="text-xs font-semibold tracking-wide">My Courses</span>
            </a>

		`
		if (currPage==currentPage(document.getElementById("coursessb-icon").href)) {
        	document.getElementById("coursessb-icon").classList.remove("hover:bg-gray-200", "text-black", "hover:text-black", "focus:text-white", "focus:text-black");
        	document.getElementById("coursessb-icon").classList.add("bg-gray-A700", "hover:bg-gray-A900", "hover:text-white", "focus:text-white", "text-white");
        } else {
        	document.getElementById("coursessb-icon").classList.remove("bg-gray-A700", "hover:bg-gray-A900", "hover:text-white", "focus:text-white", "text-white");
        	document.getElementById("coursessb-icon").classList.add("hover:bg-gray-200", "text-black", "hover:text-black", "focus:text-white", "focus:text-black");
        }

		document.getElementById("nav-sidebar").innerHTML +=
		`
                <a id="degresssb-icon" href="mydegrees.html" class="hover:no-underline focus:no-underline flex flex-col items-center w-full cursor-pointer py-3 px-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-2 w-6 h-6"><circle cx="12" cy="8" r="7"></circle>
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                    <span class="text-xs font-semibold tracking-wide">My Degrees</span>
                </a>
		`
		if (currPage==currentPage(document.getElementById("degresssb-icon").href)) {
        	document.getElementById("degresssb-icon").classList.remove("hover:bg-gray-200", "text-black", "hover:text-black", "focus:text-white", "focus:text-black");
        	document.getElementById("degresssb-icon").classList.add("bg-gray-A700", "hover:bg-gray-A900", "hover:text-white", "focus:text-white", "text-white");
        } else {
        	document.getElementById("degresssb-icon").classList.remove("bg-gray-A700", "hover:bg-gray-A900", "hover:text-white", "focus:text-white", "text-white");
        	document.getElementById("degresssb-icon").classList.add("hover:bg-gray-200", "text-black", "hover:text-black", "focus:text-white", "focus:text-black");
        }


		document.getElementById("nav-sidebar").innerHTML +=
			`
                <div class="flex-grow pt-16"></div>
                <div id="createbutton-placeholder"></div>
                <div class="flex-auto maxheight-3vh"></div>
			`
}

function showCreateButton () {
	document.getElementById("createbutton-placeholder").innerHTML =
		`
			<div id="createcourse-ext" class="flex-none overflow-hidden duration-500" style="height: 0px;">
	            <div id="createcourse-ext-2" class="w-full border-0 border-solid border-gray-300 h-0">
	                <a href="addcourse.html" class="hover:no-underline focus:no-underline flex flex-col items-center w-full cursor-pointer py-3 px-1 hover:bg-gray-200 text-black hover:text-black focus:text-black" title="Course">
	                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-2 w-6 h-6">
	                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
	                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
	                    </svg>
	                    <span class="text-xs font-semibold tracking-wide">Course</span>
	                </a>
	                <a href="adddegree.html" class="hover:no-underline focus:no-underline flex flex-col items-center w-full cursor-pointer py-3 px-1 hover:bg-gray-200 text-black hover:text-black focus:text-black" title="Shot">
	                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-2 w-6 h-6"><circle cx="12" cy="8" r="7"></circle>
	                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
	                    </svg>
	                    <span class="text-xs font-semibold tracking-wide">Degree</span>
	                </a>
	            </div>
	        </div>
	        <a id="createcourse-button" class="hover:no-underline focus:no-underline flex flex-col items-center w-full cursor-pointer py-3 px-1 hover:bg-gray-200 text-black hover:text-black focus:text-black" title="Create">
	            <svg viewBox="0 0 24 24" stroke="currentColor" class="mb-2 w-6 h-6">
	                <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
	            </svg>
	            <span class="text-xs font-semibold tracking-wide">Create</span>
	        </a>
		`

	document.getElementById("createcourse-button").addEventListener('click', (e) => {
		if (document.getElementById("createcourse-ext-2").classList.contains("h-0")) {
			document.getElementById("createcourse-ext").style="height: 146px;";
			document.getElementById("createcourse-ext-2").classList.remove("h-0");
			document.getElementById("createcourse-ext-2").classList.add("border-t");
		} else {
			document.getElementById("createcourse-ext").style="height: 0px;";
			document.getElementById("createcourse-ext-2").classList.remove("border-t");
			document.getElementById("createcourse-ext-2").classList.add("h-0");
		}
	});

}