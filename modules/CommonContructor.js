const cheerio = require('cheerio')
const request = require('request-promise')


class NovaTerra {
  constructor(parseFunc, fixed) {
    // empty
    this.url = null
    
    this.fixed = fixed
    this.parseFunc = parseFunc
    this.allocationAll = ['停车位', '厨房', '客厅', '浴室', '洗手间', '总浴室:', '总Wc:', '停车总数:'] // 6-8是goldenhome的
    this.zhcnToEn = {
      每平方米价格: 'priceperm',
      街区: 'place',
      房间: 'roomCount',
      楼层: 'floor',
      建造年份: 'buildYear',
      供暖系统: 'warmSys',
      情况: 'condition',
      // 下面是goldenhome添加的
      '区:': 'place',
      '房间总数:': 'roomCount',
      '楼层号:': 'floor',
      '建成年份:': 'buildYear',
      '装修年份:': 'decorateYear'
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
      decorateYear: '', // 装修年份，只有goldenhome有
      floor: '', // 楼层
      floorCount: '',// 楼层数
      detail: '', // 详细信息以table的html先存储，同时进行分析
      allocation: [], // 配置：停车位，浴室，洗手间等等
      warmSys: '',
      condition: ''
    }
  }
  init(url) {
    this.url = url
    this.fixed.originalURL = url
    this.houseData = Object.assign(this.houseData, this.fixed)
    return this
  }
  // .property-price->price #property-gallery img->图片
  parse($) {
    this.parseFunc($, this)
  }
  getFromUrl(url) {
    this.options = {
      url: url,
      transform: (body) => {
        return cheerio.load(body)
      },
      timeout: 30000
    }
    return request.get(this.options)
  }
  deal() {
    return this.getFromUrl(this.url).then(($) => {
      return this.parse($)
    }).catch((err)=>{
      // console.log(err)
    })
  }
}

const contruct = (config) => {
  const { parse, fixed } = config
  return new NovaTerra(parse, fixed)
}
module.exports = contruct
