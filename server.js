const express = require('express');
const path = require('path');
require("dotenv").config();

const data = require('./static/testData');
const app = express();
let PORT;
process.env.PORT ? PORT = process.env.PORT : PORT = 3000
// const  = process.env.PORT || 3000

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  return res.render(path.resolve(__dirname + '/dist/index.html'), data);
});

app.use(express.static('dist'));

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/dist/404.html'))
})

app.use((req, res) => {
  res.status(500).sendFile(path.join(__dirname, '/dist/500.html'))
})

app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`);
});
