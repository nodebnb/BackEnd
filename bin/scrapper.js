/*
* NO COMMERCIAL USE! This is only for academic purpose
*/
let http = require("http")
let phantom = require("phantom")
let mongoose = require('mongoose')
let Listing = require('../app/models/listing')
let maxPageCountPerSearch = 20
let urlBase = "https://www.airbnb.com/s/"
let location = "Palo-Alto"
let suffix = "--CA?source=bb&ss_id=4oqxri9a&page="
let spawn = require('child_process').spawn

require('songbird')

function saveData(listings) {
    async() => {
        for (let i of listings) {
            try {
                let listOne = await Listing.promise.find({
                        bnbId: i.bnbId
                    })
                    // if listOne does not exist or it's returning an empty arr
                if (!listOne || listOne.length === 0) {
                    let listOne = new Listing(i)
                    await listOne.save()
                }
            } catch (e) {
                console.log('e', e)
            }
        }
    }()
}

function initPhantom(req, res, count) {
    let url = urlBase + location + suffix +count
    console.log(">< url", url)
    phantom.create((ph) => {
        ph.createPage((page) => {
            page.open(url, (status) => {
                console.log(">< status", status)
                page.includeJs(
                    // We use jQuery to parse the document
                    "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js",
                    function() {
                        page.evaluate(() => {
                            let data = {
                                listing: []
                            }
                            $('.listing').each(function() {
                                let listOne = {
                                    bnbId: $(this).data('id'),
                                    lat: $(this).data('lat'),
                                    lng: $(this).data('lng'),
                                    name: $(this).data('name'),
                                    price: $(this).data('price').match(/sup>([\d.]+)<sup/)[1],
                                    url: $(this).data('url'),
                                    image: $(this).find('img').attr('src'),
                                    images: $(this).find('img').data('urls')
                                }
                                data.listing.push(listOne)
                            })
                            return data

                        }, function(data) {
                            let listings = data.listing
                            async() => {
                                await saveData(listings)
                                console.log(">< process done page", count)
                                if (count < maxPageCountPerSearch){
                                   initPhantom(req, res, ++count)
                                }
                                console.log(">< process all done")
                                ph.exit()
                                res.end('done')
                            }()
                        })
                    }
                )

            })
        })
    })
}

http.createServer((req, res) => {
    initPhantom(req, res, 0)
}).listen(8080)

mongoose.connect('mongodb://127.0.0.1:27017/nodebnb')

