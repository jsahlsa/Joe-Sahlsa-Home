---
layout: layout.njk
title: Eleventy wont process post
tags: [blog, git]
---

# {{ title }}

Do not put spaces in [YAML](https://yaml.org/) frontmatter `tags` like this: `tags: blog git`, instead use an array like this: `tags: [blog, git]`, or as a list like this:

```yaml
    tags:
        - blog
        - git
```

In [Eleventy](https://www.11ty.dev) his post would show up in `collections.blog` or `collections.git` because of its tags in the frontmatter.
