const Parser = require('rss-parser');
const parser = new Parser({
  headers: { Accept: 'application/rss+xml, text/xml; q=0.1' },
});

exports.parseRss = async (url) => {
  const content = await parser.parseURL(url);

  const recentPost = content?.items[0];
  const tags = recentPost?.categories;
  console.log(`rss tags ====`, tags);
  return {
    blogTitle: content?.title,
    description: content?.description,
    postTitle: recentPost?.title,
    postLink: recentPost?.link,
    tags: tags?.slice(1),
  };
};
