const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const { DateTime } = require('luxon');
const markdownIt = require('markdown-it');
const { default: anchor } = require('markdown-it-anchor');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');
const postcss = require('postcss');
const postcssImport = require('postcss-import');
const postcssMediaMinmax = require('postcss-media-minmax');
const autoprefixer = require('autoprefixer');
const postcssCsso = require('postcss-csso');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight, {
    alwaysWrapLineHighlights: true,
  });

  // postcss config
  eleventyConfig.addTemplateFormats('css');

  // post css processing
  // merges all imports and processes output
  // without copying import files
  // credit: https://pepelsbey.dev/articles/eleventy-css-js/
  eleventyConfig.addExtension('css', {
    outputFileExtension: 'css',
    compile: async (content, path) => {
      if (path !== './src/style.css') {
        return;
      }

      console.log(`path: ${path}`);
      console.log(`content: ${content}`);
      return async () => {
        let output = await postcss([
          postcssImport,
          postcssMediaMinmax,
          autoprefixer,
          postcssCsso,
        ]).process(content, {
          from: path,
        });
        return output.css;
      };
    },
  });

  eleventyConfig.addPassthroughCopy('src/index.js');
  eleventyConfig.addPassthroughCopy('src/fonts');
  eleventyConfig.addPassthroughCopy('src/images');

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addFilter('postDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  // filter to exclude tags from posts
  eleventyConfig.addFilter('exclude', (collection, stringToFilter) => {
    if (!stringToFilter) {
      return collection;
    }
    return (collection ?? []).filter((item) => item !== stringToFilter);
  });

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
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
