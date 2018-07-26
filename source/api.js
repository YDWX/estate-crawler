module.exports = {
  novaTerra: {
    agency: 'nova-terra',
    active: true,
    enHost: 'https://www.nova-terra.gr/en',
    host: 'https://www.nova-terra.gr/zh/fangdichan/chazhao',
    listApi:
      'https://www.nova-terra.gr/zh/fangdichan/chazhao?listingType=sale&category=residential&region=102&municipality%5B0%5D=0&roomsLow=nd&priceHigh=400000&page=', //后面接页码
    query: {
      listingType: 'sale',
      category: 'residential',
      region: 102,
      'municipality[0]': 0,
      roomsLow: 'nd',
      priceHigh: 400000,
      page: ''
    },
    getMaxPage($) {
      const a = $('#pagination-info')
        .text()
        .split('\n')[0]
      const pageCount = parseInt(a.substring(a.length - 2))
      return pageCount
    }
  },
  goldenhome: {
    agency: 'goldenhome',
    active: false,
    listApi:
      'https://www.nova-terra.gr/zh/fangdichan/chazhao?listingType=sale&category=residential&region=102&municipality%5B0%5D=0&roomsLow=nd&priceLow=&priceHigh=400000&livingAreaLow=&livingAreaHigh=&myCode=&page=' //后面接页码
  },
  xerg: {
    agency: 'xe.gr',
    active: false,
    listApi:
      'https://www.nova-terra.gr/zh/fangdichan/chazhao?listingType=sale&category=residential&region=102&municipality%5B0%5D=0&roomsLow=nd&priceLow=&priceHigh=400000&livingAreaLow=&livingAreaHigh=&myCode=&page=' //后面接页码
  }
}
