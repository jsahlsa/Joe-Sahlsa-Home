const links = document.links;

// Maybe implement a light/dark theme toggle by checking theme and updating custom props
// let root = document.documentElement;

// root.style.setProperty('--orange-A700', 'red');
// const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
// console.log(darkThemeMq.matches);

// add _blank target for outside links
for (let i = 0; i < links.length; i++) {
  if (links[i].hostname != window.location.hostname) {
    links[i].setAttribute('class', 'outside-link');
    links[i].target = '_blank';
  }
}

// remove links from subheads, trade off between javascript and accessibility
const subheadLinks = document.querySelectorAll('h1 + h2 > a');
subheadLinks.forEach((item) => (item.href = ''));

console.log('hi');
console.log(subheadLinks);
