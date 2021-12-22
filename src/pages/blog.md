---
title: blog
layout: home.njk
tags: pages
---


<ul class="blog posts">
{% for post in collections.blog %}
<li class="blog post">
<a href="{{ post.url }}">{{ post.data.title }}</a> <p class='blog-list dates'>{{ post.date | postDate }}<p>
<ul class="blog-tags">
{% for tag in post.data.tags %}
<li>
{{ tag | lower }}
</li>
{% endfor %}
</ul>
</li>
{% endfor %}
</ul>

