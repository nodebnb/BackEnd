module.exports = (app) => {
  app.get('/', (req, res) => res.json({"data": "No result found."}))

  app.get('/q', (req, res) => {

    res.json({"data": "No result found."})
  })
}

