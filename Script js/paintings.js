loadPaintings();

let paintingContainers;
const PAINTINGS = document.querySelector("#paintings");
const FULL_SCREEN_PAINTING = document.querySelector(".fullScreenPainting");
const PHOTOGALLERY = document.querySelector("#photogallery");
const CLOSE_GALLERY = document.querySelector(".closeGallery");
const BODY = document.querySelector("body");
const PAINTING_IMG = document.createElement("img");
const LEFT_ARROW = document.querySelector(".leftArrow");
const RIGHT_ARROW = document.querySelector(".rightArrow");
const SORTING_CRITERIA=document.querySelector("#sort select");
const SORT=document.querySelector("#sort input[name=sortPaintings]");

const DELAY = 1500;

let index;
let timeout;


FULL_SCREEN_PAINTING.appendChild(PAINTING_IMG);

window.addEventListener("mousemove", showControls);
window.addEventListener("click", showControls);
window.addEventListener("touchstart", showControls);
window.addEventListener("keydown", keyControls);

//SORT.addEventListener("click", sortBy);

CLOSE_GALLERY.addEventListener("click", closeGallery);
LEFT_ARROW.addEventListener("click", previousPainting);
RIGHT_ARROW.addEventListener("click", nextPainting);


function loadPaintings() {
  fetch("Php/paintings.php").then(onResponse).then(onJson);
}


function onJson(json) {
  let paintingContainer;
  let paintingContainerImg
  let paintingDescription
  let paintingTitle
  let paintingDimensions
  for (let i = 0; i < json.length; i++) {
    paintingContainer = document.createElement("div");
    paintingContainer.classList.add("paintingContainer");
    paintingContainer.dataset.index = json[i].index;
    paintingContainer.dataset.title = json[i].title;
    paintingContainer.dataset.height = json[i].height;
    paintingContainer.dataset.width = json[i].width;
    paintingContainer.dataset.category = json[i].category;
    paintingContainerImg = document.createElement("img");
    paintingContainerImg.src = json[i].src;
    paintingContainer.appendChild(paintingContainerImg);
    paintingDescription = document.createElement("div");
    paintingDescription.classList.add("paintingDescription");
    paintingContainer.appendChild(paintingDescription);
    paintingTitle = document.createElement("div");
    paintingTitle.classList.add("paintingTitle");
    paintingTitle.textContent = json[i].title;
    paintingDescription.appendChild(paintingTitle);
    paintingDimensions = document.createElement("div");
    paintingDimensions.classList.add("paintingDimensions");
    paintingDimensions.textContent = json[i].width + "X" + json[i].height;
    paintingDescription.appendChild(paintingDimensions);
    PAINTINGS.appendChild(paintingContainer);
    addEventListeners();
  }



}






function addEventListeners() {
  paintingContainers = document.querySelectorAll(".paintingContainer");

  for (let i = 0; i < paintingContainers.length; i++) {
    paintingContainers[i].addEventListener("click", showFullPaintingImage);
  }

}

function onResponse(response) {
  return response.json();
}





function showControls() {
  clearTimeout(timeout);
  PHOTOGALLERY.classList.remove("fadeOut");
  PHOTOGALLERY.classList.add("fadeIn");
  timeout = setTimeout(hideControls, DELAY);
}

function hideControls() {
  PHOTOGALLERY.classList.remove("fadeIn");
  PHOTOGALLERY.classList.add("fadeOut");
}



//It only shows the full screen image
function showFullPaintingImage(event) {
  index = event.currentTarget.dataset.index;
  BODY.classList.add("noScroll");
  FULL_SCREEN_PAINTING.classList.remove("hidden");
  PHOTOGALLERY.classList.remove("hidden");
  PAINTING_IMG.src = "Painting%20wide/painting" + index + "wide.jpeg";
  showControls();
  clearTimeout(timeout);
  timeout = setTimeout(hideControls, DELAY);
}

function closeGallery() {
  FULL_SCREEN_PAINTING.classList.add("hidden");
  PHOTOGALLERY.classList.add("hidden");
  BODY.classList.remove("noScroll");
}

function previousPainting() {
  index--;

  if (index < 1) {
    index = paintingContainers.length;
  }

  PAINTING_IMG.src = "Painting%20wide/painting" + index + "wide.jpeg";

}

function nextPainting() {
  index++;

  if (index > paintingContainers.length) {
    index = 1;
  }

  PAINTING_IMG.src = "Painting%20wide/painting" + index + "wide.jpeg";

}

function keyControls(event) {
  if (event.key == "ArrowRight" || event.key == "ArrowDown") {
    nextPainting();
  }
  if (event.key == "ArrowLeft" || event.key == "ArrowUp") {
    previousPainting();
  }
  if (event.key == "Escape") {
    closeGallery();
  }
}










