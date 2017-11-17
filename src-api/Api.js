const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
require('./Database')

// ––– API http errors –––
// 400 if invalid request to the API is made
// 422 if input data validation fails
// 500 if express is the problem
// 501 if database is the problem
// 404 if database entry is not found
// 504 if crashed (uncought error)

const API = {}
API.protected = ['done']
API.done = function (res, data, options = {}) {
  if (res) {
    if (options.code) {
      res.status(options.code).json(data)
    } else {
      res.json(data)
    }
  } else {
    return data
  }
}
// Extend API functionality
require('./ApiAccounts')(API)

var router = express.Router()
router.post('/', function (req, res) {
  let queries = req.body
  if (!queries ||
  typeof queries !== 'object' ||
  Object.keys(queries).length === 0 ||
  Object.keys(queries).length > 1 ||
  queries.constructor !== Object) {
    return API.done(res, {error: 'Invalid API call structure'}, {code: 400})
  }
  for (let call in queries) {
    if (queries.hasOwnProperty(call)) {
      if (API.protected.indexOf(call) !== -1 || call.charAt(0) === '_') {
        return API.done(res, {error: 'Protected API call'}, {code: 400})
      }
      if (typeof API[call] !== 'function') {
        return API.done(res, {error: 'Non-existent API call'}, {code: 400})
      } else {
        API[call](res, queries[call])
          .catch(error => {
            console.log('API Error', error)
            return API.done(res, {error: 'Uncought API error'}, {code: 500})
          })
      }
    }
    break // Only allow one call pr query, because otherwise the HTTP status codes can not be used
  }
})

app.use('/', express.static('dist'))
app.use('/api', router)
app.listen(8000)
