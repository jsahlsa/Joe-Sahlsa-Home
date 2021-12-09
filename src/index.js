const links = document.links;
const landingImage = document.querySelector('.landing-image');
const width = window.innerWidth;

// add _blank target for outside links
for (let i = 0; i < links.length; i++) {
  if (links[i].hostname != window.location.hostname) {
    links[i].setAttribute('class', 'outside-link');
    links[i].target = '_blank';
  }
}

// remove links from subheads, trade off between javascript and accessibility
const subheadLinks = document.querySelectorAll('h1 + h2 > a');
subheadLinks.forEach(item => item.href = "");

console.log('hi');
console.log(subheadLinks)
