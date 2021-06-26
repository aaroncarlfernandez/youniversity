NProgress.configure({ showSpinner: false });

if (localStorage.getItem("isAdmin")=="true") {
  loadAllCourses();
} else {
  loadActiveCourses ();
}


document.getElementById("searchcourse-button").addEventListener('click', (e) => {
  searchCourses(document.getElementById("searchcourse-input").value);
});
document.getElementById("searchcourse-input").addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    document.getElementById("searchcourse-button").click();
  }
});


