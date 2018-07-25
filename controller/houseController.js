const model = require('../models/index')
const logger = require('../logger')
module.exports = {
  create(houseData) {
    const { houseId, agency } = houseData
    model.house
      .findOneAndUpdate({ houseId, agency }, { $set: houseData }, { upsert: true })
      .exec()
      .then((result) => {
        logger.info(`upsert result: ${result}`)
      })
    // model
    //   .findOne({ houseId, agency })
    //   .exec()
    //   .then((result) => {
    //     if (result) {
    //       model.house.update()
    //     }else {
    //       model.house.create(houseData).then((result) => {})
    //     }
    //   })
    // model.house.create(houseData).then((result) => {})
  },
  getHouses(query) {
    query = query || {}
    return model.house.find(query).exec()
  }
}
