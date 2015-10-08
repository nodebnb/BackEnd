let requireDir = require('require-dir')
let App = require('./app/app')
let config = requireDir('./config', {recursive: true})
let mongoose = require('mongoose')
let exec = require('child_process').exec
let spawn = require('child_process').spawn

// start mongodb server
// exec('ps -edaf | grep mongo | wc -l', (error, stdout, stderr) => {
//   if(stdout < 2) {
//     exec('mongod &', (error, stdout, stderr) => {
//       if(error) {
//         exec('rm /data/db/mongod.lock &')
//       }
//       console.log('MongoDB started')
//     })
//   }
// })

const NODE_ENV = process.env.NODE_ENV
mongoose.connect(config.database[NODE_ENV].url)

// start elasticsearch server
// exec('ps aux | grep elasticsearch | wc -l', (error, stdout, stderr) => {
//     if(stdout < 2) {
//     	exec('ElasticSearch &', (error, stdout, stderr) => {
//     		console.log('Search engine started')
//     	})
//     }
// })

// start app server
let port = process.env.PORT || 8000
let app = new App(config)

app.initialize(port)
  .then(()=> console.log(`Listening @ http://127.0.0.1:${port}`))
  .catch(e => console.log(e.stack ? e.stack : e))