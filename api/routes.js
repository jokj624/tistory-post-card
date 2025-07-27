const express = require('express');
const router = express.Router();

const template = require('../templates/card');
const utilRss = require('../utils/rss');

/**
 * @apiRoutes /api/post?name=
 */
router.get('/post', async (req, res) => {
  const { name, theme } = req.query;
  if (!name) {
    return res
      .status(400)
      .send({ code: 400, message: 'Blog name is required' });
  }

  if (theme && theme !== 'light' && theme !== 'dark') {
    return res.status(400).send({ code: 400, message: 'Invalid theme' });
  }

  const { blogTitle, description, postTitle, postLink, tags } =
    await utilRss.parseRss(`https://${name}.tistory.com/rss`);

  if (!postTitle || !postLink) {
    return res
      .status(404)
      .send({ code: 404, message: 'Not found recent post' });
  }
  const cardSvg = template.getPostCardSvg(
    postLink,
    blogTitle,
    description,
    postTitle,
    tags.length > 5 ? tags.slice(0, 5) : tags,
    theme,
  );
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(cardSvg);
});

module.exports = router;
