//Use middleware
const express = require("express")
const passport = require("passport")
const morgan = require("morgan")
const bodyParser = require('body-parser')
const app = express()

const env = process.env.NODE_ENV || 'development'

//Database connect
const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:admin@localhost:5432/robot'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Init session
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'rainbow cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const pool = new Pool({
    connectionString: connectionString,
})

//Use morgan logging
app.use(morgan())

//Routing
require("./config/route")(app, passport, pool)
require("./config/passport")(passport, pool)

app.listen(9000, (req, res) => {
    console.log("Server open at 9000")
})
