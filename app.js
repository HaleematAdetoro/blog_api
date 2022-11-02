const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000

require('./database/db').connectToMongoDB()
require('dotenv').config()

require('./middleware/auth')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/', authRoute);
app.use('/blog', passport.authentication('jwt', { session: false }), blogsRoute);

app.get('/', (req, res) => {
    res.send('home')
})



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})