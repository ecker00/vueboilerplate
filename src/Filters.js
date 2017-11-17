import Vue from 'vue'
const dateFormat = require('dateformat')

Vue.filter('date', input => {
  return dateFormat(input, 'd mmm yyyy')
})
Vue.filter('time', input => {
  return dateFormat(input, 'HH:MM:ss')
})

Vue.filter('number', input => {
  if (!input) return 0
  else return parseInt(input)
})
