const model = require('../models/index')

module.exports = {
  create(houseData) {
    model.house.create(houseData).then((result) => {})
  },
  getHouses(query) {
    query = query||{}
    return model.house.find(query).exec()
  }
}
