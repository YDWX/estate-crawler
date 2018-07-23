module.exports = {
  name: String, // 形式：公寓 出售
  houseId: String, //编号
  place: String, // 地点
  size: Number, // 面积 110（不带单位）
  title: String, // 由上面三个字段组成
  agency: String, // 中介
  contact: String, //302109601909
  originalURL: String, // 原始信息链接
  price: String, // 总价
  priceperm: String, // 单位欧元
  unitOfPrice: { type: String, default: '€' },
  picGallery: Array, // 该房产的所有图片集合
  roomCount: String, //房间数
  kind: String, // 房屋分类
  buildYear: String, // 建造年份
  floor: String, // 楼层
  detail: String, // 详细信息以table的html先存储，同时进行分析
  allocation: Array, // 配置：停车位，浴室，洗手间等等
  warmSys: String,
  condition: String,
  disable: { type: Boolean, default: false }
}
