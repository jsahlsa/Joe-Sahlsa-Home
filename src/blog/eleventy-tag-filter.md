---
title: Eleventy tag filter
subtitle: Use eleventy filter to exclude unwanted tags
tags:
  - blog
  - 11ty
date: 2023-06-16
templateEngineOverride: njk, md
---

# {{ title }}

## {{ subtitle }}

{{ page.date | postDate }} {.page-dates}

Eleventy comes with tons of great features right out of the box. One of them is [filters](https://www.11ty.dev/docs/filters/). Per the docs:

> A filter is a function which can be used within templating syntax to transform data into a more presentable format. Filters are typically designed to be chained, so that the value returned from one filter is piped into the next filter.{.note}

I want to include all the relevant tags associated with my blog posts and snippets. The problem is that I am using a `blog` and a `snippet` tag to make these two seperate collections, and these are appearing when I loop through the tags for each post. So I reached for eleventy filters as a solution to my problem.

The front matter of my blog posts looks like this:

```yaml
title: Another dumb post
tags:
  - blog
  - 11ty
  - State Capitols
  - fortran
```

I want all the tags to appear with the exception of `blog`, but I need to keep it as a tag in order to use it as a collection. I probably should have just used pagination, but I can't be bothered. So the solution is a filter. It goes inside your eleventy config file. Here is how it looks for me:

```js
// filter to exclude tags from posts
eleventyConfig.addFilter('exclude', (collection, stringToFilter) => {
  if (!stringToFilter) {
    return collection;
  }
  return (collection ?? []).filter((item) => item !== stringToFilter);
});
```

You would use the filter like so in your `.njk` file:

```njk
{% raw %}{# set tags variable, then filter unwanted tag(s), then loop over the array #}
{% set tags = post.data.tags | exclude('blog') %}
{% for tag in tags %}
<li>
{{ tag | lower }}
</li>
{% endfor %}
{% endraw %}
```

> Please note that this must be used in a `.njk` file in order to work properly (or your preferred template engine). You may also be able to use `templateEngineOverride: njk, md`, but I have not explored this.{.warning}

Other templating engines can accomplish the same thing, but in my case I am using `nunjucks`.

Taken from the [simpixelated](https://simpixelated.com/filtering-tags-within-eleventy-js-collections/) blog. Big thanks!🎉 {.thanks}
