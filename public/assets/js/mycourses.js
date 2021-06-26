let admincourseText0;
let admincourseText1;
let admincourseText2;

searchCourseById(0);
if (localStorage.getItem("isAdmin")=="true") {
    document.getElementById("coursepage-title").innerHTML = `<h1 class="-mt-2 mb-6 text-left">Created Courses</h2>`
    admincourseText0 = "Active";
    admincourseText1 = "Deactivated";
    admincourseText2 = "All";

} else {
    document.getElementById("coursepage-title").innerHTML = `<h1 class="-mt-2 mb-6 text-left">Courses Taken</h2>`
    admincourseText0 = "Enrolled";
    admincourseText1 = "Completed";
    admincourseText2 = "Cancelled";
}
{/* <button class="admincourse-bar-0 rounded-none bg-white hover:bg-gray-buttonHover py-2.5 px-4 transition-none text-black transition ease-in duration-500 border-0 border-b-4 border-solid border-primary" id="reader-works-list-tab-0"> */}
document.getElementById("admincourse-bar").innerHTML =
    `
            <div class="styles__ControlsWrapper-sc-1ft9myz-4 czhfrK">
                <div class="tailwind-hidden sm:block">
                    <div class="flex items-center font-sans ">
                        <div class="flex">
                            <button class="admincourse-bar-0 rounded-none bg-white hover:bg-gray-buttonHover py-2.5 transition-none text-black transition ease-in duration-500 border-0 border-b-4 border-solid border-primary" id="reader-works-list-tab-0">
                                <span class="fill-current"></span>
                                <span class="font-bold ">${admincourseText0}</span>
                            </button>
                            <button class="admincourse-bar-1 rounded-none bg-white hover:bg-gray-buttonHover py-2.5 transition-none text-gray-A100 border-transparent" id="reader-works-list-tab-1">
                                <span class="fill-current"></span>
                                <span class="font-bold ">${admincourseText1}</span>
                            </button>
                            <button class="admincourse-bar-2 rounded-none bg-white hover:bg-gray-buttonHover py-2.5 transition-none text-gray-A100 border-transparent" id="reader-works-list-tab-2">
                                <span class="fill-current"></span>
                                <span class="font-bold ">${admincourseText2}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="sm:hidden">
                    <div class="flex items-center font-sans ">
                        <div class="flex overflow-x-auto no-scrollbar">
                            <button class="admincourse-bar-0 rounded-none bg-white hover:bg-gray-buttonHover py-2.5 transition-none text-black transition ease-in duration-500 border-0 border-b-4 border-solid border-primary" id="reader-works-list-tab-0">
                                <span class="fill-current"></span>
                                <span class="font-bold ">${admincourseText0}</span>
                            </button>
                            <button class="admincourse-bar-1 rounded-none bg-white hover:bg-gray-buttonHover py-2.5 transition-none text-gray-A100 border-transparent" id="reader-works-list-tab-1">
                                <span class="fill-current"></span>
                                <span class="font-bold ">${admincourseText1}</span>
                            </button>
                            <button class="admincourse-bar-2 rounded-none bg-white hover:bg-gray-buttonHover py-2.5 transition-none text-gray-A100 border-transparent" id="reader-works-list-tab-2">
                                <span class="fill-current"></span>
                                <span class="font-bold ">${admincourseText2}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    `;

for (let i=0; i<2; i++) {
    document.getElementsByClassName("admincourse-bar-0")[i].addEventListener('click', (e) => {
        selectTab({index: i, active:0, deactivatedTabs:[1,2]});
    });

    document.getElementsByClassName("admincourse-bar-1")[i].addEventListener('click', (e) => {
        selectTab({index: i, active:1, deactivatedTabs:[0,2]});
    });

    document.getElementsByClassName("admincourse-bar-2")[i].addEventListener('click', (e) => {
        selectTab({index: i, active:2, deactivatedTabs:[0,1]});
    });
}

function selectTab(specs) {
    searchCourseById(specs.active);
    document.getElementsByClassName(`admincourse-bar-${specs.active}`)[specs.index].className = `admincourse-bar-${specs.active} rounded-none bg-white hover:bg-gray-buttonHover py-2.5 px-4 transition-none text-black transition ease-in duration-500 border-0 border-b-4 border-solid border-primary`;
    for (let i=0; i<specs.deactivatedTabs.length; i++) {
        document.getElementsByClassName(`admincourse-bar-${specs.deactivatedTabs[i]}`)[specs.index].className = `admincourse-bar-${specs.deactivatedTabs[i]} rounded-none bg-white hover:bg-gray-buttonHover py-2.5 px-4 transition-none text-gray-A100 border-transparent`;
    }
}
