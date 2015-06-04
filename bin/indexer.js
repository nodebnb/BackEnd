/**
 * This indexes crawled nodebnb listings to ElasticSearch
 * 1. run scrapper to generate bnb.json
 * 2. Import "bnb.json" to mongodb database "nodebnb" table "listings"
 * mongoimport --db nodebnb --collection listings --file bnb.json
*/
let elasticsearch = require('elasticsearch')
let Listing = require('../app/models/listing')
let mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/nodebnb')

let client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})
const index = "listings"
const type = "listing"

require('songbird')

async function indexListings() {
    let result = await Listing.promise.find({})

    let listings = result.reduce((items, item) => {
        items.push({index: {_index: index, _type: type, _id: item._id}})
        items.push(item)
        return items
    }, [])

    await client.promise.bulk({body: listings})
}

(function() {
    let start = Date.now()

    console.log("Starting Indexing @", start)

    indexListings().catch(e => console.log(e.stack))

    console.log("Succesfully indexed in", Date.now() - start, "ms");

    process.exit()
}())




