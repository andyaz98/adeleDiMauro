const INTERVAL = 3000;
let i = 0;

loadBackgrounds();



function loadBackgrounds() {
  fetch("Php/slides.php").then(onResponse).then(showBackgrounds);
}

function onResponse(response) {
  return response.json();
}



function showBackgrounds(slides) {
  let overlay = document.querySelector("#overlay");
  let slide_img;
  let layer;
  let titleContainer;
  let title1;
  let title2;
  let subtitleContainer;
  let subtitle;

  for (let i = 0; i < slides.length; i++) {
    slide_img = document.createElement("img");
    slide_img.setAttribute("id", "slide" + slides[i].index);
    slide_img.classList.add("background");
    if (i != 0) {
      slide_img.classList.add("hidden");
    }
    slide_img.src = slides[i].src;
    overlay.appendChild(slide_img);
  }

  layer=document.createElement("div");
  layer.setAttribute("id","layer");
  overlay.appendChild(layer);

  titleContainer=document.createElement("div");
  titleContainer.setAttribute("id","titleContainer");
  title1=document.createElement("div");
  title1.setAttribute("id","title1");
  title2=document.createElement("div");
  title2.setAttribute("id","title2");
  title1.textContent="I miei quadri";
  title2.textContent="";

  titleContainer.appendChild(title1);
  titleContainer.appendChild(title2);

  overlay.appendChild(titleContainer);

  subtitleContainer=document.createElement("div");
  subtitleContainer.setAttribute("id","subtitleContainer");
  subtitle=document.createElement("div");
  subtitle.setAttribute("id","subtitle");
  subtitle.textContent="Pittura olio su tela";

  subtitleContainer.appendChild(subtitle);

  overlay.appendChild(subtitleContainer);





  setTimeout(slideshow, INTERVAL);
}

function slideshow() {

  const background = document.querySelectorAll(".background");

  const IMGCOUNT = background.length;
  

  background[i].classList.add("hidden");

  if (i == (IMGCOUNT - 1)) {

    background[0].classList.remove("hidden");
    i = 0;
  }
  else {

    background[(i + 1)].classList.remove("hidden");
    i++;
  }

  setTimeout(slideshow, INTERVAL);
}




