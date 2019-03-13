const Promise = require ('bluebird');
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const actions = require('./actions')
const router = require('./router/router.js')
const config = require('./config/config_server.js')

const database = require("./database/database.js");

const app = express()
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/', express.static('client/build'));
// app.use('/specifications', express.static('public/specifications'));
app.use(router)

Promise.try(() => {
  return actions.initialize(database);
}).then(() => {
  app.listen(config.port, function () {
    console.log('Serveur listening on : ' + config.host + config.port)
  });
});
