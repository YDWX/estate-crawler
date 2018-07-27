const mongoose = require('./models/index')
const houseController = require('./controller/houseController')
const onehouse = {
  "unitOfPrice" : "€",
  "picGallery" : ["https://m2.spitogatos.gr/139740199_900x675.jpg?v=20130730", "https://m3.spitogatos.gr/139740200_900x675.jpg?v=20130730", "https://m1.spitogatos.gr/139740201_900x675.jpg?v=20130730", "https://m2.spitogatos.gr/139740202_900x675.jpg?v=20130730", "https://m3.spitogatos.gr/139740203_900x675.jpg?v=20130730", "https://m1.spitogatos.gr/139740204_900x675.jpg?v=20130730", "https://m2.spitogatos.gr/139740205_900x675.jpg?v=20130730", "https://m3.spitogatos.gr/139740206_900x675.jpg?v=20130730", "https://m1.spitogatos.gr/139740207_900x675.jpg?v=20130730", "https://m2.spitogatos.gr/139740208_900x675.jpg?v=20130730", "https://m3.spitogatos.gr/139740209_900x675.jpg?v=20130730", "https://m1.spitogatos.gr/139740210_900x675.jpg?v=20130730", "https://m2.spitogatos.gr/139740211_900x675.jpg?v=20130730", "https://m3.spitogatos.gr/139740212_900x675.jpg?v=20130730", "https://m1.spitogatos.gr/139740213_900x675.jpg?v=20130730", "https://m2.spitogatos.gr/139740214_900x675.jpg?v=20130730", "https://m3.spitogatos.gr/139740215_900x675.jpg?v=20130730", "https://m1.spitogatos.gr/139740216_900x675.jpg?v=20130730", "https://m2.spitogatos.gr/139740217_900x675.jpg?v=20130730", "https://m3.spitogatos.gr/139740218_900x675.jpg?v=20130730", "https://m1.spitogatos.gr/139740219_900x675.jpg?v=20130730", "https://m2.spitogatos.gr/139740220_900x675.jpg?v=20130730", "https://m3.spitogatos.gr/139740221_900x675.jpg?v=20130730", "https://m1.spitogatos.gr/139740222_900x675.jpg?v=20130730", "https://m2.spitogatos.gr/139740223_900x675.jpg?v=20130730"],
  "allocation" : ["停车位", "厨房", "客厅", "浴室", "洗手间"],
  "disable" : false,
  "name" : "独栋出售",
  "houseId" : "3239099",
  "place" : "Dikigorika (Voula)",
  "size" : 430,
  "agency" : "nova-terra",
  "contact" : "2108983470, 2108943120",
  "phone": '111111111',
  "originalURL" : "https://www.nova-terra.gr/zh/fangdichanxijie/6886687",
  "price" : "1,800,000",
  "priceperm" : "€ 4,186",
  "roomCount" : "5",
  "kind" : "",
  "buildYear" : "2010",
  "floor" : "3",
  "detail" : "",
  "warmSys" : "自动供暖系统 (汽油)",
  "condition" : "已粉刷油漆, 新发展",
}

houseController.create(onehouse)