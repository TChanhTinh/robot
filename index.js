const express = require("express")
const morgan = require("morgan")
const bodyParser = require('body-parser')
const Router = require('express-promise-router')
const app = express()


const router = new Router()
const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:admin@localhost:5432/dictionary'

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

const pool = new Pool({
    connectionString: connectionString,
  })

app.use(morgan())

require("./routes/route")(app, pool, router)

app.listen(9000, (req, res) => {
    console.log("Server open at 9000")
})
