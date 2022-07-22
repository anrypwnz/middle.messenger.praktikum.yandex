const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'html')
app.engine('html', require('hbs').__express);

app.get('/', (req, res) => {
  return res.render(path.resolve(__dirname + '/dist/index.html'))
});

app.use(express.static('dist'))

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/dist/404.html'))
})

app.use((req, res) => {
  res.status(500).sendFile(path.join(__dirname, '/dist/500.html'))
})

app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`)
});
