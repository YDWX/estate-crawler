module.exports = {
  novaTerra: {
    agency: 'nova-terra',
    active: false,
    enHost: 'https://www.nova-terra.gr/en',
    host: 'https://www.nova-terra.gr/zh/fangdichan/chazhao',
    listApi:
      'https://www.nova-terra.gr/zh/fangdichan/chazhao?listingType=sale&category=residential&region=102&municipality%5B0%5D=0&roomsLow=nd&priceHigh=400000&page=', // 后面接页码
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
    },
    getHouseList() {
      return $('#property-listing .listing-item')
    },
    getHouseUrl($, house) {
      return $(house)
        .find('.listing-image')
        .attr('href')
    }
  },
  goldenhome: {
    agency: 'goldenhome',
    active: true,
    host: 'https://goldenhome.gr/property/index?PropertySearch[TrnTypeID]=2&PropertySearch[PropCategID]=11704&PropertySearch[AskedValue_to]=400000&page=920',
    listApi:
      'https://www.nova-terra.gr/zh/fangdichan/chazhao?listingType=sale&category=residential&region=102&municipality%5B0%5D=0&roomsLow=nd&priceLow=&priceHigh=400000&livingAreaLow=&livingAreaHigh=&myCode=&page=', // 后面接页码
    enHost: 'https://goldenhome.gr/site/index?language=en',
    query: {
      'PropertySearch[TrnTypeID]': 2,
      'PropertySearch[PropCategID]': 11704,
      'PropertySearch[AskedValue_to]': 400000,
      page: null // 最多909
    },
    getMaxPage($) {
      return 909
    },
    getHouseList($) {
      return $('#feat-listview .item .property-thumb-info-content a')
    },
    getHouseUrl($, house) {
      return `https://+${location.host}+${$(house).attr('href')}`
    }
  },
  xegr: {
    agency: 'xe.gr',
    active: false,
    host: '',
    listApi:
      'https://www.nova-terra.gr/zh/fangdichan/chazhao?listingType=sale&category=residential&region=102&municipality%5B0%5D=0&roomsLow=nd&priceLow=&priceHigh=400000&livingAreaLow=&livingAreaHigh=&myCode=&page=', // 后面接页码
    enHost: '',
    query: {},
    getMaxPage($) {
    },
    getHouseList($) {
    },
    getHouseUrl($, house) {
    }
  },
  plasisrealestate: {
    agency: 'plasisrealestate',
    active: false,
    host: 'https://www.plasisrealestate.com/zh/fangdichan/chazhao',
    listApi:
      'https://www.plasisrealestate.com/zh/fangdichan/chazhao?listingType=sale&category=residential&propertyTypes%5B%5D=&region=102&priceLow=&priceHigh=400000&livingAreaLow=&livingAreaHigh=&myCode=&roomsLow=nd&roomsHigh=nd&floorNumberLow=nd&floorNumberHigh=nd&constructionYearLow=&constructionYearHigh=&heatingControllers=&heatingMedia=', // 后面接页码
    enHost: 'https://www.plasisrealestate.com/en',
    query: {
      listingType: 'sale',
      category: 'residential',
      region: '102',
      priceHigh: '400000',
      roomsLow: 'nd',
      floorNumberLow: 'nd',
      floorNumberHigh: 'nd'
    },
    getMaxPage($) {
      return parseInt($('#pagination-info').text().split(' ')[3].trim())
    },
    getHouseList($) {
      return $('.property-list .property-item')
    },
    getHouseUrl($, house) {
      return $(house).attr('href')
    }
  }
}
