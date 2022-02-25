
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require("cors");
const mongoose = require('mongoose')



mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(cors());
app.use(express.json())

const infoRouter = require('./routes/infos')
app.use('/infos', infoRouter)



const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });