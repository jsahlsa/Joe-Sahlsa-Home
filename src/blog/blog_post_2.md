---
title: Building this site
tags: blog
date: '2021-12-01'
---

# {{ title }}

## I get distracted easily, so I should probably make a list

{{ page.date | postDate }} {.page-dates}

After much procrastinating and a good amount of distracting myself I have finally built something resembling my own website. I know if I want to find work as a web developer I should probably have one. I think it might boost my cred, rather than just telling people I can make websites.

Ultimately I would like this site to serve as both a blog and portfolio. Right now it is just a landing page, an about page, and a blog. I still need to implement the portfolio part, but at the rate I go, that could take a couple more years. I figure I should get something up—however imperfect—it's better than nothing.

I've spent some time on [MDN](https://developer.mozilla.org/en-US/), [freeCodeCamp](https://www.freecodecamp.org/), various tutorials, building things, and now I feel like I can take that leap and put myself out there. Much time has been spent [hemming and hawing](https://grammarist.com/phrase/hem-and-haw-or-hum-and-haw/), and reading, and becoming discouraged. I just have to start making things, breaking things, then rebuilding, then breaking again.

Armed with limited knowledge, I decided to use [Eleventy](https://www.11ty.dev/) to build this site. In retrospect it was pretty easy getting started. The documentation helped with most of my roadblocks, as well as a great community. Probably took a few hours to get all the main parts wired up. The part that really messed me up was my approach to writing my `css`. In my defense, I actually had no plan in place. Soooo…I just crammed all the `css` into one file. With no plan in place, I went ahead with the brave (i.e. stupid) decision to write all custom `css`. I borrowed some for resets ([Andy Bell](https://piccalil.li/blog/a-modern-css-reset/), [Josh Comeau](https://www.joshwcomeau.com/css/custom-css-reset/), and [Elad Shechter](https://elad.medium.com/the-new-css-reset-53f41f13282e)). I also grabbed a `prism.css` file, and proceeded to mangle it. Eventually I'd like to break up my css into modules, and maybe clean it up a bit, but for now I'll think I'll let it serve as a reminder (warning).
