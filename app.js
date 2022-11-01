const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000

require('./database/db').connectToMongoDB()
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('home')
})



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})