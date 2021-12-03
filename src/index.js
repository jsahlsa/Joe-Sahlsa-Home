const links = document.links;
const landingImage = document.querySelector('.landing-image');
const width = window.innerWidth;

// add _blank target for outside links
for (let i = 0; i < links.length; i++) {
  if (links[i].hostname != window.location.hostname) {
    links[i].target = '_blank';
  }
}

// adjust size of landing image based on window size
if (width < 1200) {
  landingImage.setAttribute('class', 'landing-image small');
}

console.log('hi');
