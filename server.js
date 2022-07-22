const express = require('express');
const path = require('path');
require("dotenv").config();

const app = express();
let PORT = process.env.PORT || 3000

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  return res.render(path.resolve(__dirname + '/dist/index.html'));
});

app.use(express.static('dist'));

app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`);
});
