---
layout: layout.njk
title: Creating a style guide for this site
tags: blog
---

# {{ title }}

Making a style guide is an intimidating proposition for me for a couple reasons. Firstly, I have never really created a proper one before, and secondly, it is for my own project, so I have more skin in the game. I'd ultimately like to get some sort of standard process in place that I could use for future projects. I think the best approach for me is to break it up into small sections that are more easily digestible.

Right now my site is just posts and a landing page. The post pages should be pretty straightforward, but for the landing page I want to make something cool. Right now I think I'll use [figma](https://www.figma.com) to wireframe everything. I am going to use [google material design](https://material.io/design) to assist in creating a color theme. For fonts I am just going to bop around and try to find something cool. Nothing too out there, and probably two families tops. I may create an svg in illustrator for my landing page.

## Setting up the CSS

I have decided not to use any css libraries, I am only going to be using postcss with the [auto-prefixer](https://github.com/postcss/autoprefixer), [cssnano](https://github.com/cssnano/cssnano), [stylelint](https://stylelint.io/) and [css-preset-env](https://preset-env.cssdb.org/). I install these so I don't have to worry too much about the css I write.

For the base of my css I'll use a [modern reset](https://elad2412.github.io/the-new-css-reset/), and custom properties.

As I continue to create this site I'll update this post, probably burning it wholesale ans restarting after I've come to the realization that it's all wrong.

## Color

1. Color theme (light):
   1. Primary:
      - hsl(26, 100%, 50%) <span class="theme-color primary-light"></span>
   2. Secondary
      - hsl(172, 100%, 32%) <span class="theme-color secondary-light"></span>

I threw these into the [material design color tool](https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=FF6F00&secondary.color=FAFAFA&primary.text.color=FAFAFA), and here is what I got:

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="VwzOJZE" data-user="jsahlsa" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/jsahlsa/pen/VwzOJZE">
  MDC example</a> by joe sahlstrom (<a href="https://codepen.io/jsahlsa">@jsahlsa</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Typography

I have not picked out a font family yet, but I know for sure that I wanted to use fluid typography, and [utopia](https://utopia.fyi/) has a great tool to generate it. They use the css [`clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp()) property to adjust font size based on viewport width.
