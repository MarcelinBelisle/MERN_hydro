if (process.env.NODE_ENV !== 'production') {
    require('dotenv').parse()
}

require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.static('/public'));

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const infoRouter = require('./routes/infos')
app.use('/infos', infoRouter)




app.listen(process.env.PORT || 5000)