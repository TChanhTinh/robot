var path = require('path');

const { requiresAdmin } = require('./middlewares/authorization')
const admin = require('../app/admin')

module.exports = (app, passport, db) => {
  app.get("/", (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../dictionary')})
  })

  app.get("/search/dictionary/:word", async (req, res) => {
    const word = req.params.word
    //const { rows } = await pool.query(`SELECT * FROM Dictionary WHERE word='${word}'`)
    db.query('SELECT * FROM veterinary_husbandry WHERE lower(word)=lower($1)', [word], (err, results) => {
      if (err)
        res.send(err)
      if (results)
        outputWord = results.rows[0]
        db.query('SELECT relate_word FROM related_word WHERE lower(word)=lower($1)', [word], (err, results) => {
          if(err)
            res.send(err)
          if(results) {
            let relate = results.rows.map(a => a.relate_word);
            res.send({...outputWord, ...{relate: relate} })
          }
        })
    })
  })

  app.post("/dictionary/add", (req, res) => {
    word = req.body
    db.query('INSERT INTO VETERINARY_HUSBANDRY(word, mean, type, pronunciation, description, times, username) values($1, $2, $3, $4, $5, CURRENT_DATE, $6)',
      [word.word, word.mean, word.type, word.pronounce, word.description, word.username],
      (err, results) => {
        if (err) {
          console.log(err)
          res.send("failed")
        }
        if (results) {
          res.send("added")
        }
      })
  })

  app.post("/dictionary/edit", (req, res) => {
    word = req.body
    console.log(word)
    db.query('UPDATE VETERINARY_HUSBANDRY SET word=$1, mean=$2, type=$3, pronunciation=$4, description=$5, times=CURRENT_DATE, username=$6 WHERE description=$5;',
      [word.word, word.mean, word.type, word.pronounce, word.description, word.username],
      (err, results) => {
        if (err) {
          console.log(err)
          res.send("failed")
        }
        if (results) {
          res.send("edited")
        }
      })
  })

  app.get('/dictionary/login', admin.renderLogin)
  app.get('/dictionary/register', admin.renderRegister)
  app.post('/dictionary/login', (req, res, next) => {
    console.log(req.body)
    passport.authenticate('local', { successRedirect: '/dictionary/admin', failureRedirect: '/dictionary/login' })(req, res, next)
  })

  app.get('/admin/panel', requiresAdmin, admin.renderPanel)
}
