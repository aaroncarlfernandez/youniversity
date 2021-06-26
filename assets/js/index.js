window.addEventListener('load', function() { 
  if (localStorage.length===0) { 
    // document.getElementById("homepage-notice").innerHTML = 
    //     `
    //       <div class="flex flex-col w-full sm:max-w-sm sm:m-12 fixed p-4 bg-primary-lightP2 z-50 bottom-0 right-0 text-center sm:rounded sm:border border-solid border-0 border-t border-primary-lightP1">
    //         <p class="text-base">Feel free to create an account and log in. This portfolio website does not monitor or save any user activity.</p>
    //         <button id="homepage-button" class="w-full outlined-default py-2 mt-4">Got it!</button>
    //       </div>
    //     `
    //   document.getElementById("homepage-button").addEventListener('click', (e) => {
    //     document.getElementById("homepage-notice").innerHTML = ``;
    //   });
  } else {
    window.location.replace("pages/mycourses.html");
  }
  getAllStats().then(() => {

    setTimeout(() => fadeOut(document.getElementById('status')), 1500);
    setTimeout(() => fadeOut(document.getElementById('preloader')), 1500);
    setTimeout(() => document.getElementsByTagName('html')[0].classList.remove('overflow-hidden'), 1500);

    let mutationoObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutationRecord) {
          if (document.getElementById('preloader').style.display=="none") {
  
            const config = {
              root: null,
              rootMargin: '0px',
              threshold: 0.5
            };
            let interSectionObserver = new IntersectionObserver(function(entries) {
              entries.forEach(function (entry) {
                const {isIntersecting, intersectionRatio} = entry;
          
                if ((isIntersecting === true || intersectionRatio > 0)) {
                  animateValue(studentsAmount, 0, studentsTotal, 3000);
                  animateValue(coursesAmount, 0, coursesCount, 3000);
                  animateValue(graduatesAmount, 0, degreesCount, 1000);
                  interSectionObserver.unobserve(entry.target);
                }
              });
            }, config);
  
            interSectionObserver.observe(document.getElementById('youniversity-stats'));
          }
      });    
    });
    
    mutationoObserver.observe(document.getElementById('preloader'), { attributes : true, attributeFilter : ['style'] });
  })
});

function fadeOut(element){
  element.style.opacity = 1;

  (function fade() {
    if ((element.style.opacity -= .1) < 0) {
      element.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

const studentsAmount = document.getElementById("students-amount");
const coursesAmount = document.getElementById("courses-amount");
const graduatesAmount = document.getElementById("graduates-amount");

let studentsTotal, coursesCount, degreesCount;

function getStudentsCount() {
  return fetch("https://rocky-reaches-53288.herokuapp.com/api/users/count", { method: 'GET', redirect: 'follow' })
  .then(response => response.json())
  .then(result => studentsTotal = result.count)
  .catch(error => console.log('error', error));
}
function getCoursesCount() {
  return fetch("https://rocky-reaches-53288.herokuapp.com/api/courses/count", { method: 'GET', redirect: 'follow' })
  .then(response => response.json())
  .then(result => { coursesCount = result.count})
  .catch(error => console.log('error', error));
}

function getDegreesCount() {
  return fetch("https://rocky-reaches-53288.herokuapp.com/api/degrees/count", { method: 'GET', redirect: 'follow' })
  .then(response => response.json())
  .then(result => { degreesCount = result.count})
  .catch(error => console.log('error', error));
}

function getAllStats() {
  return Promise.all([getStudentsCount(), getCoursesCount(), getDegreesCount(),loadActiveCourses()])
}

document.getElementById("searchcourse-button").addEventListener('click', (e) => {
  searchCourses(document.getElementById("searchcourse-input").value);
});
document.getElementById("searchcourse-input").addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    document.getElementById("searchcourse-button").click();
  }
});

