const request = require('request-promise')
const cheerio = require('cheerio')
const _ = require('lodash')
// const mongoose = require('./models/index')
const sources = require('./source/api')
const mod = require('./modules')
console.log(mod)
_.forIn(sources, (value, key) => {
  if (!value.active) {
    return
  }
  const { agency, page, listApiTemp } = { value }
  const minP = page.min
  const maxP = page.max + 1

  const options = {
    url: listApiTemp + 1,
    transform: (body) => {
      return cheerio.load(body)
    }
  }
  const HouseDealer = mod.novaTerra
  request.get(options).then(($) => {
    const hosueList = $('#property-listing .listing-item') // .listing-image->url h4>a->名称 .listing-item-code->代码
    
    const houseUrl = $(hosueList[0])
      .find('.listing-image')
      .attr('href')
    console.log(
      $(hosueList[0])
        .find('.listing-image')
        .attr('href')
    )
    HouseDealer.deal(houseUrl)
  })
  // _.forEach(_.range(minP, maxP, 1), (page) => {
  //   const listApi = listApiTemp + page
  //   console.log(listApi)
  // })
})
