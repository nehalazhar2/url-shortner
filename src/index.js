require('dotenv').config();
const express = require('express');
const createRouter = require('./routes');

const app = express();
const urlStore = new Map();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(createRouter(urlStore));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
