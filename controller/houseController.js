const model = require('../models/index')
const _ = require('lodash')

module.exports = {
  create(houseData) {
    model.house
      .create(houseData)
      .then((result) => {
      })
  }
}
