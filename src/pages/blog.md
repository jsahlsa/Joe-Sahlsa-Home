---
title: blog
layout: home.njk
tags: pages
---

##### Posts:
<ul class="blog posts">
{% for post in collections.blog %}
<li class="blog post">
<div>
<a href="{{ post.url }}">{{ post.data.title }}</a> <p class='blog-list dates'>{{ post.date | postDate }}<p>
</div>
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

##### Snippets:
<ul class="blog posts">
{% for snippet in collections.snippet %}
<li class="blog post">
<div>
<a href="{{ snippet.url }}">{{ snippet.data.title }}</a> <p class='blog-list dates'>{{ snippet.date | postDate }}<p>
</div>
<ul class="blog-tags">
{% for tag in snippet.data.tags %}
<li>
{{ tag | lower }}
</li>
{% endfor %}
</ul>
</li>
{% endfor %}
</ul>
