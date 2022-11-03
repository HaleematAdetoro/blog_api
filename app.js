const app = require('./index')

const PORT = process.env.PORT || 5000

require('./database/db').connectToMongoDB()
require('dotenv').config()



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})