const app = require('./index')
const CONFIG = require('./config/config')


require('./database/db').connectToMongoDB()
require('dotenv').config()



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})