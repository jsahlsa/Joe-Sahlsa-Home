const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const { DateTime } = require('luxon');
const markdownIt = require('markdown-it');
const { default: anchor } = require('markdown-it-anchor');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight, {
    alwaysWrapLineHighlights: true,
  });

  eleventyConfig.addPassthroughCopy('src/*.css');
  eleventyConfig.addPassthroughCopy('src/index.js');
  eleventyConfig.addPassthroughCopy('src/fonts');
  eleventyConfig.addPassthroughCopy('src/images');

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addFilter('postDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  // markdown-it anchor links

  let mdIt = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  })
    .use(markdownItAnchor, {
      permalink: anchor.permalink.headerLink(),
      slugify: (s) =>
        s
          .trim()
          .toLowerCase()
          .replace(/[\s+~\/]/g, '-')
          .replace(/[().`,%·'"!?¿:@*]/g, ''),
      level: [2, 3, 4],
    })
    .use(markdownItAttrs);

  eleventyConfig.setLibrary('md', mdIt);

  return {
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site',
    },
  };
};
