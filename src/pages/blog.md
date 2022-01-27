---
title: blog
layout: home.njk
tags: pages
---

##### Posts:
<ul class="blog posts">
{% for post in collections.blog %}
<a href="{{ post.url }}" class="blog post">
<li>
<div>
{{ post.data.title }} <p class='blog-list dates'>{{ post.date | postDate }}<p>
</div>
<ul class="blog-tags">
{% for tag in post.data.tags %}
<li>
{{ tag | lower }}
</li>
{% endfor %}
</ul>
</li>
</a>
{% endfor %}
</ul>

##### Snippets:
<ul class="blog posts">
{% for snippet in collections.snippet %}
<a href="{{ snippet.url }}" class="blog post">
<li>
<div>
{{ snippet.data.title }} <p class='blog-list dates'>{{ snippet.date | postDate }}<p>
</div>
<ul class="blog-tags">
{% for tag in snippet.data.tags %}
<li>
{{ tag | lower }}
</li>
{% endfor %}
</ul>
</li>
</a>
{% endfor %}
</ul>
