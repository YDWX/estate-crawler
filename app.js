const request = require('request-promise')
const cheerio = require('cheerio')
const _ = require('lodash')
// const mongoose = require('./models/index')
const sources = require('./source/api')

_.forIn(sources, (value, agency) => {
  if (!value.active) {
    return
  }
  const minP = value.page.min
  const maxP = value.page.max + 1
  const listApiTemp = value.listApi

  const options = {
    url: listApiTemp + 1,
    transform: (body) => {
      cheerio(body)
    }
  }
  request.get(listApiTemp + 1).then((html) => {
    console.log(html)
  })
  // _.forEach(_.range(minP, maxP, 1), (page) => {
  //   const listApi = listApiTemp + page
  //   console.log(listApi)
  // })
})
