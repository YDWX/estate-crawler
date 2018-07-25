const model = require('../models/index')

module.exports = {
  create(houseData) {
    const {houseId, agency} = houseData
    model.house.find({houseId, agency}).exec().then((result)=>{
      
    })
    model.house.create(houseData).then((result) => {

    })
  },
  getHouses(query) {
    query = query||{}
    return model.house.find(query).exec()
  }
}
