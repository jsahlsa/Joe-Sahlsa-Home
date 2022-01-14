---
title: First Post
tags: blog
date: '2021-12-01'
description: 'A little about how this site came to be'
---

# {{ title | capitalize }}

## {{ description }}

{{ page.date | postDate }} {.page-dates}

After much procrastinating and a good amount of distracting myself I have finally built something resembling my own website. I'm not real sure how it started, but at some point I became aware of html, then css, and began creating crude pages just for fun. It didn't take me too long to realize that this was something I really enjoyed. Since then I've spent a lot of time reading documentation, taking tutorials, and building things. At times I have become frustrated—making, then breaking, then making—but overall it has been an enjoyable journey.

## Building this page

In this first post I want to document how I built this site (mostly for my future self). After building sites mostly with just html, css, and javascript, I eventually learned more about server-side ([Django](), [express]()), frameworks/libraries, and static site generators. 

I came to the somewhat arbitrary decision to use [11ty]() for this site. I decided I wanted to use an SSG, and based on some reading, [11ty]() seemed like a good choice. As for the CSS, I decided to eschew any frameworks and instead write it myself. I also made the regrettable decision to put it all in one file, although I'm not really sure you could call that part a "decision". 

## 11ty

As this post is not meant to be a tutorial or any type of documentation I don't have a lot to say about [11ty]() other than it is awesome! As my site is pretty simple, I had everything wired up in a couple hours. I used both the built in [collections](https://www.11ty.dev/docs/collections/) and [pages](https://www.11ty.dev/docs/pages-from-data/). I also took advantage of the [syntaxhighlight](https://www.11ty.dev/docs/plugins/syntaxhighlight/) plugin. Initially I liked [11ty]() because I could use [markdown](https://www.markdownguide.org/) for my pages, and then I elected to use [nunjuks](https://mozilla.github.io/nunjucks/) for a templating language. So far so good…

## CSS

What I should have done is just use [SASS](https://sass-lang.com/) like [Stephanie Eckles](https://twitter.com/5t3ph) does in her [11ty Netlify Jumpstart](https://twitter.com/5t3ph). What I did do was just start writing css in `styles.css`. I guess I got kind of excited, and before you know it I had written many, many lines of css. 

Ultimately I would like this site to serve as both a blog and portfolio. Right now it is just a landing page, an about page, and a blog. I still need to implement the portfolio part, but at the rate I go, that could take a couple more years. I figure I should get something up—however imperfect—it's better than nothing.

I've spent some time on [MDN](https://developer.mozilla.org/en-US/), [freeCodeCamp](https://www.freecodecamp.org/), various tutorials, building things, and now I feel like I can take that leap and put myself out there. Much time has been spent [hemming and hawing](https://grammarist.com/phrase/hem-and-haw-or-hum-and-haw/), and reading, and becoming discouraged. I just have to start making things, breaking things, then rebuilding, then breaking again.

Armed with limited knowledge, I decided to use [Eleventy](https://www.11ty.dev/) to build this site. In retrospect it was pretty easy getting started. The documentation helped with most of my roadblocks, as well as a great community. Probably took a few hours to get all the main parts wired up. The part that really messed me up was my approach to writing my `css`. In my defense, I actually had no plan in place. Soooo…I just crammed all the `css` into one file. With no plan in place, I went ahead with the brave (i.e. stupid) decision to write all custom `css`. I borrowed some for resets ([Andy Bell](https://piccalil.li/blog/a-modern-css-reset/), [Josh Comeau](https://www.joshwcomeau.com/css/custom-css-reset/), and [Elad Shechter](https://elad.medium.com/the-new-css-reset-53f41f13282e)). I also grabbed a `prism.css` file, and proceeded to mangle it. Eventually I'd like to break up my css into modules, and maybe clean it up a bit, but for now I'll think I'll let it serve as a reminder (warning).
