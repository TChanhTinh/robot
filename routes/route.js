const { Router } = require("express")

module.exports = (app, pool, router) => {
 app.get("/", (req, res) => {
    res.send("hello world!")
 })
 app.get("/directory/:word", async (req, res) => {
   const word = req.params.word

   const { rows } = await pool.query(`SELECT * FROM DICTIONARY_VETER WHERE word='${word}'`)

   res.send(rows[0]) 

 })

  /*router.get('/directory/:word', async (req, res) => {
   const word = req.params
   const { rows } = await pool.query(`SELECT * FROM DICTIONARY_VETER WHERE word='${word}'`)
   res.send(rows[0])
  })*/
}
