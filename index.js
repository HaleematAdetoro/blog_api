const express = require('express');
const passport = require('passport');

const AuthRouter = require('./routes/auth')

const app = express();

require('./middleware/auth')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/', AuthRouter);


app.get('/', (req, res) => {
    res.send('home')
})

app.use('*', (req, res) => {
    return res.status(404).json({ message: 'route not found'})
})

module.exports = app;