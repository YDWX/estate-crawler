const _ = require('lodash')
const houseController = require('../controller/houseController')
const construct = require('./CommonContructor')

const fixed = {
  agency: 'goldenhome',
  contact: '2111052600, 2111041100',
  unitOfPrice: '€',
  contactName: '',
  email: 'info@goldenhome.gr',
  phone: '+86 18624069665 （中文热线，可加微信）',
  fax: '',
  officeLoc: ''
}
const parse = ($, _this) => {
  const price = $($('.content.col-md-6 span')[1])
    .text()
    .match(/\d+/)[0]
  const houseId = $($('.content.col-md-6 span')[0])
    .text()
    .match(/\d+/)[0]
  // 复式公寓 出售 Center (Voula), € 280,000, 110 平方米 -> ["复式公寓", "出售", "Center", "(Voula),", "€", "280,000,", "110", "平方米"]
  const titleArr = $('.pgl-detail h4')
    .text()
    .split(' ')
  const name = titleArr[2] + titleArr[0]
  const size = parseInt(titleArr[3])
  const imgsEle = $('#slider img')
  const picGallery = []
  _.forEach(imgsEle, (imgele) => {
    picGallery.push(`https://goldenhome.gr${$(imgele).attr('data-original')}`)
  })
  _this.houseData.picGallery = picGallery

  const propertiesTrs = $('.list-cat li')
  const curAllo = [] // 存储现有配置
  _.forEach(propertiesTrs, (item) => {
    const key = $(item)
      .find('strong')
      .text()
    const value = $(item)
      .text()
      .split(' ')[1]
    if (_this.zhcnToEn[key]) {
      _this.houseData[_this.zhcnToEn[key]] = value? value:'暂无数据'
    } else if (_this.allocationAll.includes(key)) {
      curAllo.push(key + ' ' + (value ? value : '暂无数据'))
    }
  })

  const currentValue = {
    allocation: curAllo,
    price,
    houseId,
    name,
    size
  }

  _this.houseData = Object.assign(_this.houseData, _this.fixed, currentValue)
  houseController.create(_this.houseData)
}
module.exports = construct({ parse, fixed })
