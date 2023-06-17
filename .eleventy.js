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
    errorOnInvalidLanguage: false,
    init: function ({ Prism }) {
      Prism.languages.nunjucks = {
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
        object:
          /\b(?:address|all_country_option_tags|article|block|blog|cart|checkout|collection|color|country|country_option_tags|currency|current_page|current_tags|customer|customer_address|date|discount_allocation|discount_application|external_video|filter|filter_value|font|forloop|fulfillment|generic_file|gift_card|group|handle|image|line_item|link|linklist|localization|location|measurement|media|metafield|model|model_source|order|page|page_description|page_image|page_title|part|policy|product|product_option|recommendations|request|robots|routes|rule|script|search|selling_plan|selling_plan_allocation|selling_plan_group|shipping_method|shop|shop_locale|sitemap|store_availability|tax_line|template|theme|transaction|unit_price_measurement|user_agent|variant|video|video_source)\b/,
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
