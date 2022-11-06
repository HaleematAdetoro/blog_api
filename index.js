const express = require('express');
const passport = require('passport');

const AuthRouter = require('./routes/auth');
const blogRouter = require('./routes/blogRoutes');
const homeRouter = require('./routes/homeRoutes')

const app = express();

require('./middleware/auth')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/', AuthRouter);
app.use('/blogs', homeRouter),
app.use('/blog', passport.authenticate('jwt', { session: false }), blogRouter);


app.get('/', (req, res) => {
    res.send('home')
})

app.use('*', (req, res) => {
    return res.status(404).json({ message: 'route not found'})
})

module.exports = app;