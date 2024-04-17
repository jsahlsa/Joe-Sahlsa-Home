---
title: Custom language syntax highlighting
tags:
    - blog
    - 11ty
    - Prism
date: 2023-09-16
description: "How to (crudely) add a custom language to Eleventy's syntax highlighting plugin"
---

# {{ title | capitalize }}

## {{ description }}

{{ page.date | postDate }} {.page-dates}

<!-- show both adding a custom language and extending liquid -->

While writing my last post on [filtering tags in Eleventy](https://joesahlsa.dev/blog/eleventy-wont-process-post/) I decided I wanted to have the ability to type examples of [nunjucks](https://mozilla.github.io/nunjucks/) code in my posts. I figured that shouldn't be a problem, so I proceeded to naively add nunjucks as the language to my code blocks. And...nothing happened. Ok, maybe its njk? Nope. So I headed over to the [Prism](https://prismjs.com/) site to see what I should be typing, and guess what? Nunjucks is not supported.

<!-- intro and why -->

Because sometimes I need things just so, I absolutely **needed** nunjucks code blocks to be syntax highlighted. As it turns out there are a couple of ways I found to do this. Digging into [Eleventy's syntax highlighting plugin](https://www.11ty.dev/docs/plugins/syntaxhighlight/), I found that you could customize [Prism](https://prismjs.com/), and part of this is the ability to add custom languages. If you don't already have it just install and import at the top of your `.eleventy.js` file:

```js
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
```

Next add the plugin to your _one_ `module.exports`:

```js
eleventyConfig.addPlugin(syntaxHighlight, { options });
```

Within the options there is the `init` property which gives access to the Prism object. Per the Eleventy syntax highlighting docs:

```js
eleventyConfig.addPlugin(syntaxHighlight, {
    // init callback lets you customize Prism
    init: function({ Prism }) {
      Prism.languages.myCustomLanguage = /* */;
    },
  });
```

So I headed over to [Prism](https://prismjs.com/extending.html#language-definitions) in order to figure out adding a new language. It is not too terribly difficult, according to their docs:

> Every language is defined as a set of tokens, which are expressed as regular expressions{.note}

The next part was how to implement the regular expressions for nunjuks syntax highlighting. One of the [issues](https://github.com/PrismJS/prism/issues/1124) on github suggested using `twig` or `liquid`, I chose the latter. (Interestingly enough, there was one [issue](https://github.com/PrismJS/prism/issues/759) from 2015 where nunjucks was almost added, but was closed beacause twig "works great".) In the repo is the `components` folder which contains all of the [language definitions](https://github.com/PrismJS/prism/blob/master/components/prism-liquid.js) for Prism. It was enough to grab the `Prism.languages.liquid` definition as the new nunjuks language. So far all I have changed is the comment pattern, and that has worked. Here is what I have in my code:

```js
eleventyConfig.addPlugin(syntaxHighlight, {
    alwaysWrapLineHighlights: true,
    errorOnInvalidLanguage: false,
    init: function ({ Prism }) {
        Prism.languages['nunjucks'] = {
            comment: /^\{#[\s\S]*?#\}/,
            delimiter: {
                pattern: /^\{(?:\{\{|[%\{])-?|-?(?:\}\}|[%\}])\}$/,
                alias: 'punctuation',
            },
            string: {
                pattern: /"[^"]*"|'[^']*'/,
                greedy: true,
            },
            keyword:
                /\b(?:as|assign|break|(?:end)?(?:capture|case|comment|for|form|if|paginate|raw|style|tablerow|unless)|continue|cycle|decrement|echo|else|elsif|in|include|increment|limit|liquid|offset|range|render|reversed|section|when|with)\b/,
            object: /\b(?:address|all_country_option_tags|article|block|blog|cart|checkout|collection|color|country|country_option_tags|currency|current_page|current_tags|customer|customer_address|date|discount_allocation|discount_application|external_video|filter|filter_value|font|forloop|fulfillment|generic_file|gift_card|group|handle|image|line_item|link|linklist|localization|location|measurement|media|metafield|model|model_source|order|page|page_description|page_image|page_title|part|policy|product|product_option|recommendations|request|robots|routes|rule|script|search|selling_plan|selling_plan_allocation|selling_plan_group|shipping_method|shop|shop_locale|sitemap|store_availability|tax_line|template|theme|transaction|unit_price_measurement|user_agent|variant|video|video_source)\b/,
            function: [
                {
                    pattern: /(\|\s*)\w+/,
                    lookbehind: true,
                    alias: 'filter',
                },
                {
                    // array functions
                    pattern: /(\.\s*)(?:first|last|size)/,
                    lookbehind: true,
                },
            ],
            boolean: /\b(?:false|nil|true)\b/,
            range: {
                pattern: /\.\./,
                alias: 'operator',
            },
            // https://github.com/Shopify/liquid/blob/698f5e0d967423e013f6169d9111bd969bd78337/lib/liquid/lexer.rb#L21
            number: /\b\d+(?:\.\d+)?\b/,
            operator: /[!=]=|<>|[<>]=?|[|?:=-]|\b(?:and|contains(?=\s)|or)\b/,
            punctuation: /[.,\[\]()]/,
            empty: {
                pattern: /\bempty\b/,
                alias: 'keyword',
            },
        };
    },
});
```

I did not add the hooks below, because I honestly could not figure out what they do, and it turns out you don't need them to get up and running.

<!-- After perusing the Prism docs some more I found a more elegant way to acheive the same result by extending an existing language. It would look something like this:

```js
Prism.languages['nunjucks'] = Prism.languages.extend('liquid', {
    'comment': { ... }
});
```

Just declare your new language as the language you would like to [extend](https://prismjs.com/docs/Prism.languages.html#.extend), with a second argument that either redefines, or takes new tokens. -->

Now I can do something like this:

```nunjucks
{% raw %}{% if ogUrl %}
    <meta
      property="og:image"
      content="https://joesahlsa.dev/img/social-preview-images/{{ title | slugify }}-1.jpeg"
    />
    <meta
      property="og:image:secure_url"
      content="https://joesahlsa.dev/img/social-preview-images/{{ title | slugify }}-1.jpeg"
    />
    {% else %}
    <meta
      property="og:image"
      content="https://joesahlsa.dev/images/og-image.jpg"
    />
    <meta
      property="og:image:secure_url"
      content="https://joesahlsa.dev/images/og-image.jpg"
    />
{% endif %}{% endraw %}
```

> Please note that if the syntax you are trying to highlight conflicts with the parent template, then you need to wrap it in `raw` tags. See [this issue](https://github.com/11ty/eleventy/issues/1474).{.warning}

Hope this helps someone with similar needs, and perhaps amateur ability like myself. 🍻

<!-- code samples -->

```

```
