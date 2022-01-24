const links = document.links;
const pres = document.querySelectorAll('pre');
const main = document.querySelector('main');
console.log(main);

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

// set up languages for <pre>
pres.forEach(item => {
  let language = item.getAttribute('class').split('-').pop();
  language === 'js' ? language = 'javascript' : language;
  const languageSpan = document.createElement('span');
  languageSpan.setAttribute('class', 'language-name');
  languageSpan.textContent = language;
  main.insertBefore(languageSpan, item);
})

// remove links from subheads, trade off between javascript and accessibility
const subheadLinks = document.querySelectorAll('h1 + h2 > a');
subheadLinks.forEach((item) => (item.href = ''));

