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
const filters = require('./utils/filters.js');
const EleventyFetch = require('@11ty/eleventy-fetch');
const API_ORIGIN = 'https://webmention.io/api/mentions.jf2';
require('dotenv').config();
const Image = require('@11ty/eleventy-img');
const Sharp = require('sharp');
const fs = require('fs');
const slugify = require('slugify');

module.exports = function (eleventyConfig) {
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });
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
  // get og images
  eleventyConfig.addAsyncFilter('ogimage', async function (url) {
    // get image from screenshot service and save to /img/og-images
    // convert to uri component
    const encoded = encodeURIComponent(url);
    // compose screenshot url
    const screenshotUrl = `https://v1.screenshot.11ty.dev/${encoded}/large/`;
    // set output dir
    const outputDir = '_site/img/social-preview-images';
    fs.readdir(outputDir, function (err, files) {
      if (err) {
        console.error('error');
      } else {
        if (files.length > 0) {
          files.forEach(function (filename) {
            if (filename.endsWith('1.jpeg')) {
              fs.unlink(`./${outputDir}/${filename}`, (err) => {
                if (err) {
                } else {
                  console.log('old og images deleted');
                }
              });
            }
          });
        }
      }
    });
    if (url.substring(22, 26) === 'blog') {
      let metadata = await Image(screenshotUrl, {
        widths: [1024],
        formats: ['jpeg'],
        outputDir: './' + outputDir,
        filenameFormat: function (id, src, width, format, options) {
          const minusService = src.substring(31, src.length - 1);
          const minusSize = minusService.slice(0, -6);
          const deencoded = decodeURIComponent(minusSize);
          const removeFront = deencoded.substring(27, deencoded.length - 1);
          return `${removeFront}.${format}`;
        },
      });
    }
    return url.substring(22, 26) === 'blog' ? true : false;
  });
  // process og images
  eleventyConfig.on('afterBuild', () => {
    const socialImagesDir = '_site/img/social-preview-images/';
    fs.readdir(socialImagesDir, function (err, files) {
      if (files.length > 0) {
        files.forEach(function (filename) {
          if (!filename.endsWith('1.jpeg')) {
            const outputName = `${filename.slice(0, -5)}`;
            const slugified = `${slugify(outputName, {
              remove: /[*+~.()"!:@]/g,
            }).replace("'", '-')}-1.jpeg`;
            Sharp(`${socialImagesDir}${filename}`)
              .resize(1200, 630, {
                fit: 'cover',
                position: 'top',
              })
              .toFile(`${socialImagesDir}${slugified}`, (err, info) => {});
          }
        });
      }
    });
  });

  // webmention filter
  eleventyConfig.addAsyncFilter('getWebmentionsForUrl', async function (url) {
    const res = await fetchWebmentions();
    const allowedTypes = [
      'mention-of',
      'in-reply-of',
      'like-of',
      'repost-of',
      'in-reply-to',
    ];

    const orderByDate = (a, b) => {
      return new Date(a.published) - new Date(b.published);
    };
    const data = res.children;
    if (!res) {
      return '';
    }
    return data
      .filter((entry) => entry['wm-target'] === url)
      .filter((entry) => allowedTypes.includes(entry['wm-property']))
      .sort(orderByDate);
  });

  eleventyConfig.addFilter('postDate', (dateObj) => {
    console.log('Date: ' + dateObj);
    return DateTime.fromJSDate(dateObj, {
      zone: 'America/Los_Angeles',
    }).toLocaleString(DateTime.DATE_MED);
  });

  // filter to set relative urls to absolute
  eleventyConfig.addFilter('absoluteUrl', (url) => {
    return `https://joesahlsa.dev${url}`;
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

async function fetchWebmentions() {
  const domain = 'joesahlsa.dev';
  const WEBMENTION_ID_TOKEN = process.env.WEBMENTION_ID_TOKEN;
  const url = `${API_ORIGIN}?domain=${domain}&token=${WEBMENTION_ID_TOKEN}`;
  console.log(url);
  return EleventyFetch(url, {
    duration: '1d',
    type: 'json',
  });
}
