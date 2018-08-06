const _ = require('lodash')
const fs = require('fs')
const Json2csvParser = require('json2csv').Parser
const moment = require('moment')
const logger = require('./logger')
const mongoose = require('./models/index')
const houseController = require('./controller/houseController')
const sources = require('./source/api')
const fields = ['tax:product_type', 'post_title', 'post_content', 'post_date', 'regular_price', 'images', 'attribute:中介', 'attribute_data:中介']
const opts = { fields }

_.forEach(sources, (item) => {
  houseController.getHouses({ agency: item.agency }).then((houses) => {
    if (!item.active||!houses.length) {
      logger.info(` no house data in Agency: ${item.agency}`)
      return
    }
    const csvOriginData = []

    _.forEach(houses, (house) => {
      const name = `${house.name} 编号 ${house.houseId}，面积 ${house.size}平方米，地区 ${
        house.place
      }`
      const price = parseInt(house.price.split(',').join(''))
      const desc = `中介：${house.agency}\n联系方式\n电话：${house.contact}\n手机号：${house.phone}\n邮箱：${house.email}\n官网链接：<a target='_blank' href='${
        item.enHost
      }'>点击跳转</a>\n综合信息\n${house.name}\n价格：${price}欧元\n楼层：${
        house.floor
      }楼\n配置：${house.allocation.join(',')}\n建筑时间${house.buildYear}年\n情况：${
        house.condition
      }\n更多信息请直接与发布者联系\n本网站温馨提醒：骗子手段多，投资需谨慎`
      const imgs = house.picGallery.join(' | ')
      const houseTem = {
        'tax:product_type': 'simple',
        post_title: name,
        post_content: desc,
        post_date: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
        regular_price: price,
        images: imgs,
        'attribute:中介': house.agency,
        'attribute_data:中介': '0|1|0'
      }
      csvOriginData.push(houseTem)
    })
    fs.writeFile(`./csvResult/${item.agency}-jsonData.json`, JSON.stringify(csvOriginData), 'utf8', (err) => {
      if (err) throw err
      logger.info(` json data generated for:  ${item.agency}`)
    })
    const parser = new Json2csvParser(opts)
    const csv = parser.parse(csvOriginData)
    fs.writeFile(`./csvResult/${item.agency}-result-withPImEx.csv`, csv, 'utf8', (err) => {
      if (err) throw err
      logger.info(` csv data generated for:  ${item.agency}`)
    })
  })
})
// const a = [
//   {
//     "类型": "simple",
//     "名称": "编号20456，面积220平方米，地点Center (Vouliagmeni)",
//     "描述":
//       "中介：goldenhome\n联系方式： 302111041100\n原信息链接：http://www.xe.gr/property/en/poliseis|katoikies|kato-voula|501151720.html\n综合信息\n公寓，二楼\n配置：卧室，浴室，洗手间，太阳能热水器，停车位，储藏间\n建筑时间1989年\n翻新2014年\n价格300000欧元\n发布时间 2018年7月16日",
//     "常规售价": 300000,
//     "图片":
//       "https://m2.spitogatos.gr/136195414_900x675.jpg?v=20130730, https://m3.spitogatos.gr/136195415_900x675.jpg?v=20130730, https://m1.spitogatos.gr/136195416_900x675.jpg?v=20130730, https://m2.spitogatos.gr/136195417_900x675.jpg?v=20130730"
//   }
// ]
// const fs = require('fs')
// fs.writeFile('ret.json', JSON.stringify(a), 'utf8', (err) => {
//   if (err) throw err
//   console.log('done')
// })
