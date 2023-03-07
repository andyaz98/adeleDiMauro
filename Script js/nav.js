const nav=document.querySelector("nav");
const navElements=document.querySelectorAll("nav .navElements div");
const navSidebarIcon=document.querySelector(".sidebarIconContainer");
const sidebarElements=document.querySelector(".sidebarElements");


navSidebarIcon.addEventListener("click", showCloseIcon);
navSidebarIcon.addEventListener("click", showSidebar);

let scrolldown=false;

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  //If the page is partially scrolled down-->Shrink the navbar (navShrink), show the background color (navFadeIn) 
  //and expand it (navGrow) when the mouse pointer goes over it
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {

    //Add an event listener when the user moves the mouse over and out from the navbar
    //Shrink the navbar because the page is scrolled down now

    nav.addEventListener("mouseover",navGrow);
    nav.addEventListener("mouseout",navShrink);
    navShrink();
    navFadeIn();



    //We want to activate the navbar grow and fadeout animations only if a scrolldown event occurred before.
    //Otherwhise there would be the same animation even if the page is still scrolling down from the top
    scrolldown=true;

  } else {
    //Else, the page is scrolled up-->Expand the navbar to its original status (navGrow), 
    //remove the event listeners and remove the background color (navFadeOut)
    if(scrolldown){
      nav.removeEventListener("mouseover",navGrow);
      nav.removeEventListener("mouseout",navShrink);
      navGrow();
      navFadeOut();
    }
  }
}

function navGrow(){

  navSidebarIcon.classList.remove("scrolldown");
  navSidebarIcon.classList.add("scrollup");

  for(let i=0;i<navElements.length;i++){
    navElements[i].classList.remove("scrolldown");
    navElements[i].classList.add("scrollup");
  }

}

function navShrink(){

  navSidebarIcon.classList.add("scrolldown");
  navSidebarIcon.classList.remove("scrollup");

  for(let i=0;i<navElements.length;i++){
    navElements[i].classList.add("scrolldown");
    navElements[i].classList.remove("scrollup");
 }
}

function navFadeOut(){

  nav.classList.remove("visible");
  nav.classList.add("transparent");
}

function navFadeIn(){

  nav.classList.remove("transparent");
  nav.classList.add("visible");
}

function showCloseIcon(){

  navSidebarIcon.classList.toggle("closeSidebarIcon");
}

function showSidebar(){

  sidebarElements.classList.toggle("closeSidebar");
}



