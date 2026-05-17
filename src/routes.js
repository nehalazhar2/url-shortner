const express = require('express');
const { nanoid } = require('nanoid');

module.exports = (urlStore) => {
  const router = express.Router();

  router.post('/shorten', (req, res) => {
    const { url } = req.body || {};
    if (!url || !/^https?:\/\//.test(url)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    const shortCode = nanoid(6);
    urlStore.set(shortCode, url);

    res.json({
      short_url: `${process.env.BASE_URL}/r/${shortCode}`,
      short_code: shortCode,
      original_url: url,
    });
  });

  router.get('/r/:code', (req, res) => {
    const originalUrl = urlStore.get(req.params.code);
    if (!originalUrl) {
      return res.status(404).json({ error: 'Short URL not found' });
    }
    res.redirect(301, originalUrl);
  });

  return router;
};
