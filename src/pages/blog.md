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
<h4 class="post-title">{{ post.data.title }}</h4> <p class='blog-list dates'>{{ post.date | postDate }}<p>
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
<h4 class="post-title">{{ snippet.data.title }}</h4> <p class='blog-list dates'>{{ snippet.date | postDate }}<p>
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
