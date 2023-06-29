const sanitizeHTML = require('sanitize-html');

module.exports = {
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
};
