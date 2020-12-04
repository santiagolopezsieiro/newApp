require('./models/User');
require('./models/Track');

const express = require('express');
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const bodyParser = require('body-parser') //allow json headers

const requireAuth = require('./middlewares/requireAuth')

const app = express();

//midlewares
app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri = 'mongodb+srv://admin:passwordpassword@cluster0.pxxy8.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('connected to mongo instance')
})

mongoose.connection.on('error', (err) => {
    console.error('error connecting to mongo', err)
})

app.get('/', requireAuth, (req, res) => {
    res.send(`your email is ${req.user.email}`)
})

app.listen(3000, () => {
    console.log("server on port 3000")
})