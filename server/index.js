'use strict'

const path = require('path')
const express = require('express')
const morgan = require('morgan')

const app = express()

app.use('/nyc-taxi/shapes', express.static(path.join(__dirname, 'data')))

app.use(morgan('dev'))

app.get('/nyc-taxi/tripInfo', (req, res) => {
  console.log(JSON.stringify(req.query))
  res.send([[new Date(), Math.ceil(Math.random() * 600)]])
})

console.log('Listening on port 8079')
app.listen(8079)
