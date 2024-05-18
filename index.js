const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello, Mubi. How are you!')
})

app.listen(port, () => {
  console.log(`Example app listening on port 3000`)
})