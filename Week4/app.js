const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/about', (req, res) => {
  res.send('this is a get request to the About page')
})
app.post('/about', (req, res) => {
  res.send('this is a post request to the About page')
})
app.put('/about', (req, res) => {
  res.send('this is a put request to the About page')
})
app.delete('/about', (req, res) => {
  res.send('this is a delete request to the About page')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})