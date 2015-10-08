let then = require('express-then')
let elasticsearch = require('elasticsearch')

let client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})

module.exports = (app) => {

  const index = 'listings'
  const type = 'listing'

  app.get('/', (req, res) => {
    client.search({}).then(body => {
      res.json(body.hits.hits)
    })
  })

  app.get('/search', (req, res) => {
    let query = req.query
    let q = query.q
    let maxPrice = query.maxPrice
    let lat = query.lat
    let lon = query.lon
    let distance = query.distance || '1km'
    let sort = 'price'
    let body


    // Return all
    if(!q) {
      body = {
        "query": {
          "match_all": {}
        }
      }
    
    // Refined query
    } else {
      body = {
        "query": {
          "filtered": {
            "query": {
              "query_string": {
                  "query": q,
                  "lenient": true,
                  "fields" : [
                    "name^5",
                    "price^10",
                    "_all"
                  ],
                  "phrase_slop": 2
              }
            }
          }
        },
        "sort": [
          {"price": "asc"}, 
          "_score"
        ],
        "min_score": 0.2
      }

      if(maxPrice) {
        body.query.filtered.filter = {
           "range": {
              "price": {
                "lte": maxPrice
              }
          }
        }
      }

      if(lat & lon) {
        body.query.filtered.filter.geo_distance = {
          distance: distance,
          Location: {
            lat: lat,
            lon: lon
          }
        }
      }
    }

    client.search({
      "index": index,
      "type": type,
      "body": body
    }).then(body => {
      res.json(body.hits.hits)
    })
  })

}

