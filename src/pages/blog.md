---
title: blog
layout: home.njk
tags: pages
---

<ul class="blog posts">
  {% for post in collections.blog %}
  <li class="blog post">
    <a href="{{ post.url }}">{{ post.data.title }}</a> <span><p class='blog-list dates'>{{ page.date | postDate }}<p></span>
  </li>
  {% endfor %}
</ul>
