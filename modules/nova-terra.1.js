const cheerio = require('cheerio')
const request = require('request-promise')
const _ = require('lodash')
const houseController = require('../controller/houseController')
class NovaTerra {
  constructor() {
    // empty
    this.url = null
    this.allocationAll = ['停车位', '厨房', '客厅', '浴室', '洗手间', '', '']
    this.zhcnToEn = {
      每平方米价格: 'priceperm',
      街区: 'place',
      房间: 'roomCount',
      楼层: 'floor',
      建造年份: 'buildYear',
      供暖系统: 'warmSys',
      情况: 'condition'
    }
    this.houseData = {
      name: '',
      houseId: '', //编号
      place: '', // 地点
      size: null, // 面积 110（不带单位）
      agency: '', // 中介
      contactName: '', // 联系人姓名
      contact: '', //302109601909 电话号码
      email: '', //邮箱
      phone: '', //手机号
      fax: '', // 传真
      officeLoc: '', // 办公室位置
      originalURL: '', // 原始信息链接
      price: '',
      priceperm: '', // 单位欧元
      unitOfPrice: '€',
      picGallery: Array, // 该房产的所有图片集合
      roomCount: '', //房间数
      kind: '', // 房屋分类
      buildYear: '', // 建造年份
      floor: '', // 楼层
      detail: '', // 详细信息以table的html先存储，同时进行分析
      allocation: [], // 配置：停车位，浴室，洗手间等等
      warmSys: '',
      condition: ''
    }
  }
  init(url) {
    this.url = url
    const fixed = {
      agency: 'nova-terra',
      contact: '2108983470, 2108943120',
      unitOfPrice: '€',
      contactName: 'Anthi Lisgari',
      email: 'notifications@nova-terra.gr',
      phone: '6956307989',
      fax: '2108983190',
      officeLoc: 'Agg.Metaxa 33,',
      originalURL: url
    }
    this.houseData = Object.assign(this.houseData, fixed)
    return this
  }
  // .property-price->price #property-gallery img->图片
  parse($) {
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
    this.houseData.picGallery = picGallery
    // for (var i = 0; i < imgsEle.length; i++) {
    //   picGallery.push($(imgsEle[i]).attr('src'))
    // }
    const fixed = {
      contact: $($('.fa-phone').parent()[0]).text().trim(),
      contactName: $('.fa-user').parent().text().trim(),
      phone: $('.fa-mobile').parent().text().trim(),
      email: $($('.fa-envelope').parent()[0]).text().trim(),
      fax: $('.fa-fax').parent().text().trim(),
      officeLoc: $('.fa-map-marker').parent().text().split(',')[0],
    }
    const propertiesTrs = $('.property-features-table table tr')
    const curAllo = [] // 存储现有配置
    _.forEach(propertiesTrs, (item) => {
      const key = $(item)
        .find('th')
        .text()
      const value = $(item)
        .find('td')
        .text()
      if (this.zhcnToEn[key]) {
        this.houseData[this.zhcnToEn[key]] = value
      } else if (this.allocationAll.includes(key)) {
        curAllo.push(key)
      }
    })
    this.houseData.allocation = curAllo
    this.houseData.price = price
    this.houseData.houseId = houseId
    this.houseData.name = name
    this.houseData.size = parseFloat(size)
    this.debug = ''
    this.houseData = Object.assign(this.houseData, fixed)
    houseController.create(this.houseData)
  }
  getFromUrl(url) {
    this.options = {
      // method: 'get',
      url: url,
      transform: (body) => {
        return cheerio.load(body)
      }
    }
    return request.get(this.options)
  }
  deal() {
    return this.getFromUrl(this.url).then(($) => {
      return this.parse($)
    })
  }
}

module.exports = new NovaTerra()
