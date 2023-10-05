---
title: First post
tags:
  - blog
  - 11ty
date: 2022-06-02
description: 'A little about how this site came to be'
---

# {{ title | capitalize }}

## {{ description }}

{{ page.date | postDate }} {.page-dates}

After much procrastinating and a good amount of distracting myself I have finally built something resembling my own website. I'm not real sure how it started, but at some point I became aware of html, then css, and began creating crude pages just for fun. It didn't take me too long to realize that this was something I really enjoyed. Since then I've spent a lot of time reading documentation, taking tutorials, and building things. At times I have become frustrated—making, then breaking, then re-making, but overall it has been an exciting journey.

## Building this page

In this first post I want to document how I built this site (mostly for my future self). After building sites mostly with just html, css, and javascript, I eventually learned more about server-side ([Django](https://www.djangoproject.com/), [express](https://expressjs.com/)), frameworks/libraries, and static site generators.

I came to the somewhat arbitrary decision to use [11ty](https://www.11ty.dev/) for this site. I decided I wanted to use an [SSG](https://jamstack.org/generators/), and based on some reading, [11ty](https://www.11ty.dev/) seemed like a good choice. As for the CSS, I decided to eschew any frameworks and instead write it myself. I also made the regrettable decision to put it all in one file, although I'm not really sure you could call that part a "decision".

## 11ty

As this post is not meant to be a tutorial or any type of documentation I don't have a lot to say about [11ty](https://www.11ty.dev/) other than it is awesome! As my site is pretty simple, I had everything wired up in a couple hours. I used both the built in [collections](https://www.11ty.dev/docs/collections/) and [pages](https://www.11ty.dev/docs/pages-from-data/). I also took advantage of the [syntaxhighlight](https://www.11ty.dev/docs/plugins/syntaxhighlight/) plugin. Initially I liked [11ty](https://www.11ty.dev/) because I could use [markdown](https://www.markdownguide.org/) for my pages, and I also elected to use [nunjuks](https://mozilla.github.io/nunjucks/) for a templating language. So far so good…

## CSS

What I should have done is just use [SASS](https://sass-lang.com/) like [Stephanie Eckles](https://twitter.com/5t3ph) does in her [11ty Netlify Jumpstart](https://twitter.com/5t3ph). What I did do was just start writing css in `styles.css`. I guess I got kind of excited, and before you know it I had written many, many lines of css. It didn't take too long for me to realize that this approach was going to cause me some headaches. A this point I had already written most of my styles, and it looked ok, so I trudged ahead. I reasoned that it would never be a big site, so I probably wouldn't have to touch it too frequently.

## JavaScript

Before experimenting with a static site generator I enjoyed using JavaScript liberally. But the "static" means you should probably keep it out, or at least to a minimum. There were a couple items I couldn't figure out how to leverage 11ty to do, so I included a small `index.js`.

One thing I wanted was for outside links to open in a new tab, and for them to have a separate class, so this is part of the file:

```js
// select links
const links = document.links;

// get each link that is not a part of the page
// and give it target: '_blank' and a class
for (let i = 0; i < links.length; i++) {
  if (links[i].hostname !== window.location.hostname) {
    links[i].setAttribute('class', 'outside-link');
    links[i].target = '_blank';
  }
}
```

The only other code in `index.js` removes `href`'s from blog `h2`s that contain the description of the post. This was necessary as I had used the [markdown-it](https://github.com/markdown-it/markdown-it) plug-in [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor) to create links for my headers. That code is just 2 lines:

```js
const subheadLinks = document.querySelectorAll('h1 + h2 > a');
subheadLinks.forEach((item) => (item.href = ''));
```

## Next steps

In future posts I would like to write about some of the items that I glossed over here, like diving a bit more into getting started with 11ty and leveraging its plug-ins. The next site I intend to build I would like give [Next.js](https://nextjs.org/) (no pun intended) a shot. I'm going to try to write about that as I am building.

One thing I realize as I write is that it (writing) is the most difficult part. Admittedly I am out of practice, but it is a different sort of writing than I am used to. I majored in history, but don't remember most of it (typical), or for that matter how to write. Hopefully it will come back to me.

That's it for this one. I'm off to get a domain, update my [twitter](https://twitter.com/joesahlsa), [github](https://github.com/jsahlsa), and [Stack Overflow](https://stackoverflow.com/).
