let then = require('express-then')
let elasticsearch = require('elasticsearch')

let client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})

module.exports = (app) => {

  const index = 'listings'
  const type = 'ca'

  app.get('/', (req, res) => {
    client.search({}).then(body => {
      res.json(body.hits.hits)
    })
  })

  app.get('/listings', (req, res) => {
    let q = req.query.q
    let sort = req.sort

    if(!sort) {
        client.search({
            index: index,
            q: q
        }).then(body => {
          res.json(body.hits.hits)
        })
    } 
  })

}

