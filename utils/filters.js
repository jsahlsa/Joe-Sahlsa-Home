const sanitizeHTML = require('sanitize-html');

module.exports = {
  getWebmentionsForUrl: function (webmentions, url) {
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

    return webmentions;
    // .filter((entry) => entry['wm-target'] === url)
    // .filter((entry) => allowedTypes.includes(entry['wm-property']))
    // .sort(orderByDate);
  },
  sanitizeHTML: function (entry) {
    const { html } = entry.content;

    const allowedHTML = {
      allowedTags: ['b', 'i', 'em', 'strong', 'a'],
      allowedAttributes: {
        a: ['href'],
      },
    };
    entry.content.value = sanitizeHTML(html, allowedHTML);

    return entry.content.value;
  },
  mentionByUrl: async function (mentions, siteUrl) {
    const filteredMentions = await mentions.filter(
      (item) => item['wm-target'] === siteUrl
    );
    return filteredMentions;
  },
};
