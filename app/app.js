let express = require('express')
let morgan = require('morgan')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let routes = require('./routes')

require('songbird')

module.exports  = class App {
    constructor(config) {
        let app = this.app = express()
        this.port = process.env.PORT || 8000

        app.use(morgan('dev'))
        app.use(cookieParser('nodebnb'))
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }))

        routes(this.app)
    }

    async initialize(port) {
        await this.app.promise.listen(port)
        return this
    }
}
