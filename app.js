const request = require('request-promise')
const cheerio = require('cheerio')
const _ = require('lodash')
const sources = require('./source/api')
const mongoose = require('./models/index')
const mod = require('./modules')

_.forIn(sources, (value, key) => {
  if (!value.active) {
    return
  }
  const { agency, listApi, host, query, getMaxPage, getHouseList, getHouseUrl } = value
  // const minP = page.min
  // const maxP = page.max + 1

  // 测试程序
  const options = {
    url: host,
    transform: (body) => {
      return cheerio.load(body)
    },
    qs: query
  }
  request
    .get(options)
    .then(($) => {
      return getMaxPage($)
    })
    .then((maxP) => {
      // 正式程序
      _.forEach(_.range(1, maxP + 1, 1), (page) => {
        query.page = page
        const options = {
          url: host,
          transform: (body) => {
            return cheerio.load(body)
          },
          qs: query
        }
        const HouseDealer = mod[key]
        request.get(options).then(($) => {
          const hosueList = getHouseList($) // .listing-image->url h4>a->名称 .listing-item-code->代码
          const promiseArr = []
          _.forEach(hosueList, (house, index) => {
            const houseUrl = getHouseUrl($, house)
            promiseArr.push(HouseDealer.init(houseUrl).deal())
          })
          Promise.all(promiseArr)
        })
      })
    })
})
