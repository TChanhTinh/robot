const { requiresAdmin } = require('./middlewares/authorization')
const admin = require('../app/admin')

module.exports = (app, passport, pool) => {
 app.get("/", (req, res) => {
    res.send("hello world!")
 })

 app.get("/search/dictionary/:word", async (req, res) => {
   const word = req.params.word
   const { rows } = await pool.query(`SELECT * FROM Dictionary WHERE word='${word}'`)
   res.send(rows[0])
 })

 app.post("/dictionary/add", (req, res) => {
   word = req.body
   pool.query(`INSERT INTO Dictionary(word, mean, type, pronunciation, description, timestamp, username) 
   values(
    '${word.word}',
    '${word.mean}',
    '${word.type}',
    '${word.pronounce}',
    '${word.description}',
    CURRENT_DATE,
    '${word.username}')`,
    (err, res) => {
      console.log(err, res)
    })
    res.send("added")
 })

 app.get('/dictionary/login', admin.renderLogin)
 app.post('/dictionary/login', passport.authenticate('local', { failureRedirect: '/' }), admin.login)
 app.get('/admin/panel', requiresAdmin, admin.renderPanel)
}
