const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000

app.use(bodyParser.json());

const todo = require('./routes/todoRoutes')
app.use('/', todo)

app.listen((port), () => {
    console.log(`app is now running on port: ${port}`)
})