const _ = require('lodash')
const houseController = require('../controller/houseController')
const construct = require('./CommonContructor')
const fixed = {
  agency: 'plasisrealestate',
  contact: '302109601909, 302109601609',
  unitOfPrice: '€',
  contactName: 'Anthi Lisgari',
  email: 'info@plasis.com.gr',
  phone: '6956307989',
  fax: '2108983190',
  officeLoc: '32, El. Venizelou Str, 166 75 Glyfada, Athens'
}
const parse = ($, _this) => {
  const price = $('.property-price')
    .text()
    .substr(2)
  const houseId = $('.property-id')
    .text()
    .substr(3)
  // 复式公寓 出售 Center (Voula), € 280,000, 110 平方米 -> ["复式公寓", "出售", "Center", "(Voula),", "€", "280,000,", "110", "平方米"]
  const titleArr = $('#page h1')
    .text()
    .split(' ')
  const name = titleArr[0] + titleArr[1]
  const size = parseInt(titleArr[titleArr.length - 2])
  const imgsEle = $('#property-gallery img')
  const picGallery = []
  _.forEach(imgsEle, (imgele) => {
    picGallery.push($(imgele).attr('src'))
  })
  _this.houseData.picGallery = picGallery
  // for (var i = 0; i < imgsEle.length; i++) {
  //   picGallery.push($(imgsEle[i]).attr('src'))
  // }
  const fixedChange = {
    contact: $($('.fa-phone').parent()[0])
      .text()
      .trim(),
    contactName: $('.fa-user')
      .parent()
      .text()
      .trim(),
    phone: $('.fa-mobile')
      .parent()
      .text()
      .trim(),
    email: $($('.fa-envelope').parent()[0])
      .text()
      .trim(),
    fax: $('.fa-fax')
      .parent()
      .text()
      .trim(),
    officeLoc: $('.fa-map-marker')
      .parent()
      .text()
      .split(',')[0]
  }
  _this.fixed = Object.assign(_this.fixed, fixedChange)
  const propertiesTrs = $('.property-features-table table tr')
  const curAllo = [] // 存储现有配置
  _.forEach(propertiesTrs, (item) => {
    const key = $(item)
      .find('th')
      .text()
    const value = $(item)
      .find('td')
      .text()
    if (_this.zhcnToEn[key]) {
      _this.houseData[_this.zhcnToEn[key]] = value
    } else if (_this.allocationAll.includes(key)) {
      curAllo.push(key)
    }
  })

  const propertyAmenities = $('.property-amenities li')
  _.forEach(propertyAmenities, (item) => {
    const onePro = $(item).text().replace(/ |\n/g, '')
    curAllo.push(onePro)
  })
  const currentValue = {
    allocation: curAllo,
    price,
    houseId,
    name,
    size: parseFloat(size)
  }

  _this.houseData = Object.assign(_this.houseData, _this.fixed, currentValue)
  houseController.create(_this.houseData)
}
module.exports = construct({ parse, fixed })
