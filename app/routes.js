module.exports = (app) => {
  app.get('/', (req, res) => res.json({"data": "No result found."}))

  app.get('/search', (req, res) => {
    res.json({"data": "No result found."})
  })
}

