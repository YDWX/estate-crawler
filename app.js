const request = require('request-promise')
const cheerio = require('cheerio')
const _ = require('lodash')
// const mongoose = require('./models/index')
const sources = require('./source/api')
const mod = require('./modules')

_.forIn(sources, (value, key) => {
  if (!value.active) {
    return
  }
  const { agency, page, listApi } = value
  const minP = page.min
  const maxP = page.max + 1

  // const options = {
  //   url: listApi + 1,
  //   transform: (body) => {
  //     return cheerio.load(body)
  //   }
  // }
  // const HouseDealer = mod.novaTerra
  // request.get(options).then(($) => {
  //   const hosueList = $('#property-listing .listing-item') // .listing-image->url h4>a->名称 .listing-item-code->代码
  //   _.forEach(hosueList, (house, index) => {
  //     const houseUrl = $(house)
  //       .find('.listing-image')
  //       .attr('href')
  //     console.log(houseUrl)
  //     HouseDealer.deal(houseUrl)
  //   })
  // })
  _.forEach(_.range(minP, maxP, 1), (page) => {
    const listApiWithPage = listApi + page
    const options = {
      url: listApiWithPage,
      transform: (body) => {
        return cheerio.load(body)
      }
    }
    const HouseDealer = mod.novaTerra
    request.get(options).then(($) => {

      const hosueList = $('#property-listing .listing-item') // .listing-image->url h4>a->名称 .listing-item-code->代码
      const promiseArr = []
      _.forEach(hosueList, (house, index) => {
        const houseUrl = $(house)
          .find('.listing-image')
          .attr('href')
        promiseArr.push(HouseDealer.init(houseUrl).deal())
      })
      Promise.all(promiseArr)
    })
  })
})
