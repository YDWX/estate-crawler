module.exports = {
  houseId: String, //编号
  place: String, // 地点
  size: Number, // 面积 110（不带单位）

  agency: String, // 中介
  contact: String, //302109601909
  originalURL: String, // 原始信息链接

  priceperm: Number, // 单位欧元
  unitOfPrice: { type: String, default: '€' },
  roomCount: Number,
  kind: String, // 房屋分类
  buildYear: String,
  floor: String,
  detail: String, // 详细信息以table的html先存储，同时进行分析
  disable: Boolean,
  allocation: Array
}
