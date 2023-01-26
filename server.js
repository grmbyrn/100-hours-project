const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const PORT = 2000
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const postRoutes = require('./routes/posts')
const commentRoutes = require('./routes/comments')

//Use .env file in config folder
require('dotenv').config({path: './config/.env'})

// mongoose settings
mongoose.set('strictQuery', false)

// Passport config
require("./config/passport")(passport);

connectDB()

app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

//Use forms for put / delete
app.use(methodOverride("_method"));

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    })
)
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// ADD ROUTES HERE
app.use('/', mainRoutes)
app.use('/post', postRoutes)
app.use('/comment', commentRoutes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}, you better catch it!`))  