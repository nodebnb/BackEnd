let requireDir = require('require-dir')
let App = require('./app/app')

let config = requireDir('./config', {recursive: true})
let port = process.env.PORT || 8000
let app = new App(config)

app.initialize(port)
  .then(()=> console.log(`Listening @ http://127.0.0.1:${port}`))
  .catch(e => console.log(e.stack ? e.stack : e))

