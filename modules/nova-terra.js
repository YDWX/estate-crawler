const cheerio = require('cheerio')
const request = require('request-promise')
class NovaTerra {
  constructor() {
    // empty
  }
  // .property-price->price #property-gallery img->图片
  parse($) {
    console.log($('.property-price').text())
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
  deal(url) {
    this.getFromUrl(url).then(($) => {
      this.parse($)
    })
  }
}

module.exports = new NovaTerra()
