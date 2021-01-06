var path = require('path');

const { requiresAdmin } = require('./middlewares/authorization')
const admin = require('../app/admin')

module.exports = (app, passport, db) => {
  app.get("/", (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../dictionary')})
  })

  app.get("/dictionary/sync/:year-:month-:day-:index", (req, res) => {
    const date = `${req.params.year}-${req.params.month}-${req.params.day}`
    const index = req.params.index
    db.query('SELECT * FROM veterinary_husbandry WHERE times>$1::date AND index>$2', [date, index], (err, results) => {
      if(err)
        console.log(err)
      if(results)
        res.send(results.rows)
    })
  })

  app.get("/search/dictionary/:word", async (req, res) => {
    const word = req.params.word
    let outputWord;
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

  app.get("/relate/:word", async (req, res) => {
    const word = req.params.word
    db.query('SELECT relate_word FROM related_word WHERE lower(word)=lower($1)', [word], (err, results) => {
      if(err)
        res.send(err)
      if(results)
        res.send(results.rows)
    })
  })

  app.post("/dictionary/add", (req, res) => {
    word = req.body
    console.log(req.body)
    db.query("INSERT INTO VETERINARY_HUSBANDRY(word, mean, type, pronunciation, description, times, username) values($1, $2, $3, $4, $5, CURRENT_DATE, $6);",
      [word.word, word.mean, word.type, word.pronounce, word.description, word.username],
      (err, results) => {
        if (err) {
          console.log(err)
          res.send(err)
        }
        if (results) {
          word.relate.map(mapData => {
            db.query("INSERT INTO RELATED_WORD(word, relate_word) values($1, $2);",
            [word.word, mapData],
            (err, results) => {
              if(err)
                console.log(err)
            })  
          })
          
        }
      })
  })

  app.post("/dictionary/delete", (req, res) => {
    word = req.body
    db.query('DELETE FROM VETERINARY_HUSBANDRY WHERE lower(word)=lower($1)', [word.word], (err, results) => {
      if(err)
        console.log(err)
      if(results)
        db.query('DELETE FROM RELATED_WORD WHERE lower(word)=lower($1)', [word.word], (err, results) => {
          if(err)
            console.log(err)
          if(results) {
            res.send("Success")
            console.log(results)
          }
        })
    })
  })

  app.post("/dictionary/edit", (req, res) => {
    word = req.body
    console.log(word)
    db.query('UPDATE VETERINARY_HUSBANDRY SET word=$1, mean=$2, type=$3, pronunciation=$4, description=$5, times=CURRENT_DATE, username=$6 WHERE description=$5 OR word=$1;',
      [word.word, word.mean, word.type, word.pronounce, word.description, word.username],
      (err, results) => {
        if (err) {
          console.log(err)
          res.send("failed")
        }
        if (results) {
          db.query("DELETE FROM RELATED_WORD WHERE word=$1",
            [word.word],
            (err, results) => {
              if(results)
              word.relate.map(mapData => {
                db.query("INSERT INTO RELATED_WORD(word, relate_word) values($1, $2);",
                [word.word, mapData],
                (err, results) => {
                  if(err)
                    console.log(err)
                })  
              })
          })
        }
      })
  })

  app.get('/dictionary/login', admin.renderLogin)
  app.get('/dictionary/register', admin.renderRegister)
  app.post('/dictionary/login', (req, res, next) => {
    console.log(req.body)
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/dictionary/login' })(req, res, next)
  })

  app.get('/admin/panel', requiresAdmin, admin.renderPanel)
}
