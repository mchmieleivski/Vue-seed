var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://localhost:8080/restaurante/api/"',
  FAKE_URL: '"https://jsonplaceholder.typicode.com/"',
})
