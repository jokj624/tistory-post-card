const express = require('express');
const router = express.Router();

const template = require('../templates/card');
const utilRss = require('../utils/rss');

/**
 * @apiRoutes /api/post?name=
 */
router.get('/post', async (req, res) => {
  const { name } = req.query;
  if (!name) {
    res.status(400).send({ code: 400, message: 'Blog name is required' });
  }

  const { blogTitle, description, postTitle, postLink, tags } =
    await utilRss.parseRss(`https://${name}.tistory.com/rss`);

  if (!postTitle || !postLink) {
    res.status(404).send({ code: 404, message: 'Not found recent post' });
  }
  const cardSvg = template.getPostCardSvg(
    postLink,
    blogTitle,
    description,
    postTitle,
    tags.length > 5 ? tags.slice(0, 5) : tags,
  );
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(cardSvg);
});

module.exports = router;
