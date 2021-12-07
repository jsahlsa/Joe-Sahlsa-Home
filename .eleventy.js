const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const { DateTime } = require('luxon');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const slugify = require('slugify');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight, {
    alwaysWrapLineHighlights: true,
  });

  eleventyConfig.addPassthroughCopy('src/*.css');
  eleventyConfig.addPassthroughCopy('src/index.js');
  eleventyConfig.addPassthroughCopy('src/fonts');
  eleventyConfig.addPassthroughCopy('src/images');

  eleventyConfig.addFilter('postDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  // markdown-it anchor links
  function removeExtraText(s) {
    let newStr = String(s).replace(/New\ in\ v\d+\.\d+\.\d+/, '');
    newStr = newStr.replace(/Coming\ soon\ in\ v\d+\.\d+\.\d+/, '');
    newStr = newStr.replace(/⚠️/g, '');
    newStr = newStr.replace(/[?!]/g, '');
    newStr = newStr.replace(/<[^>]*>/g, '');
    return newStr;
  }

  function markdownItSlugify(s) {
    return slugify(removeExtraText(s), { lower: true, remove: /[:’'`,]/g });
  }

  let mdIt = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: true,
    slugify: markdownItSlugify,
    permalinkBefore: false,
    permalinkClass: 'direct-link',
    permalinkSymbol: '#',
    level: [1, 2, 3, 4],
  });

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
