const nodeFetch = require('node-fetch');

const API_ORIGIN = 'https://webmention.io/api/mentions.jf2';
require('dotenv').config();

module.exports = async function () {
  const domain = 'joesahlsa.dev';
  const token = process.env.WEBMENTION_ID_TOKEN;
  const url = `${API_ORIGIN}?domain=${domain}&token=${token}`;

  try {
    const response = await nodeFetch(url);
    if (response.ok) {
      const feed = await response.json();
      console.log(feed);
      return feed;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
