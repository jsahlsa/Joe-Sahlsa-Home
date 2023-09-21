---
title: Andy's site
tags:
  - blog
  - Next.js
  - react
date: 2022-06-22
description: 'Creating a portfolio site for my bro'
# eleventyExcludeFromCollections: true
---

# {{ title | capitalize }}

## {{ description }}

{{ page.date | postDate }} {.page-dates}

I am a bit overdue in writing this one, but I'm sure that only matters to me since I'm the only person paying attention to this blog. My brother came to me a while back to ask for help styling some items on his [squarespace site](https://www.andysahlstrom.com/), and of course I volunteered to just redesign it from the ground up. Ever seen the old [SNL bad idea jeans](https://www.youtube.com/watch?v=mGfBEnBw01A) commercial? But seriously, I thought it would be great practice, and would hopefully bolster my portfolio, which I still need to do, but that's another story….

It's a little late now, but I am building the [site](https://andy-sahlstrom.vercel.app/) live on Netlify and Vercel. I have already hooked up most of the functionality, so now the only purpose it would serve would be to watch how the styles come together.

## Next.js

I had recently discovered the [SSG](https://jamstack.org/generators/) Next.js, and made the somewhat arbitrary decision the use that as my framework. A few things that influenced my decision were:

- I wanted more practice with [React](https://reactjs.org)
- It seemed like a good option for scaling, specifically if he wanted ease of adding and removing things, maybe by integrating [sanity](https://www.sanity.io/) or another [headless CMS](https://jamstack.org/headless-cms/)
- Based on what I could tell it is fast
- His site has many images and routes, so both the `<Link>` and `<Image>` components were appealing

I had to implement a few custom components for Andy's site. The `<RenderVideo />` and `<RenderImage />` properties are quite similar. You can probably imagine what they do. I used these inside a `<RenderMedia />` component that used `.map()` to loop over my data, first it checked whether the file is a video or image, then used that specific component to render them onto the page as a gallery.

The second more challenging component was the `<RenderMusic />`. I shamelessly stole from a great [youtube tutorial](https://www.youtube.com/watch?v=sqpg1qzJCGQ&list=PLrz61zkUHJJGLD5qlJSYfbm0Gh1Ri1Rt0&index=1) from [@selfteachme](https://twitter.com/selfteachme). I am not going to get into the details, but it is a great tutorial on creating a custom audio component in React.

Most of the other code is pretty run of the mill, and probably betrays my inexperience, check it out [here](https://github.com/jsahlsa/andy-sahlstrom) if you like.😓

Once I get some more done I'll try to update this post.
