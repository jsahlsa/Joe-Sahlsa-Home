---
title: Custom language syntax highlighting
tags:
  - blog
  - eleventy
  - Prism
date: 2023-09-16
description: "How to (crudely) add a custom language to Eleventy's syntax highlighting plugin"
eleventyExcludeFromCollections: true
---

# {{ title | capitalize }}

## {{ description }}

{{ page.date | postDate }} {.page-dates}

<!-- show both adding a custom language and extending liquid -->

While writing my last post on [filtering tags in Eleventy](https://joesahlsa.dev/blog/eleventy-wont-process-post/) I wanted to have the ability to type examples of nunjucks code in my posts. I figure that shouldn't be a problem, so I proceeded to naively add nunjucks as the language to my code blocks. And...nothing happened. Ok, maybe its njk? Nope. So I headed over to the [Prism](https://prismjs.com/) site to see what I should be typing, and guess what? Nunjucks is not supported.

<!-- intro and why -->
<!-- code samples -->
