const express = require('express');
const app = express();

const port = 8000;

app.get('/', (req, res) => res.send('Express on Vercel'));
app.get('/ping', (req, res) => res.json(true));

app.use('/api', require('./routes'));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
