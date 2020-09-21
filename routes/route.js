module.exports = (app) => {
 app.get("/", (req, res) => {
    res.send("hello world!")
 })
 
 app.post("word/{para}", (req, res) => {
  const page
  db.words.findOne({name: req.params}, (err, doc) => {
   if err 
    console.log(err)
   page = renderWord(doc)
 }) 
 res.render(page)
}
