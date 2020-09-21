const express = require("express")
const morgan = require("morgan")
const app = express()

app.use(morgan())

require("./routes/route")(app)

app.listen(9000, (req, res) => {
    console.log("Server open at 9000")
})
