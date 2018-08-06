// 商品
// 商品名称 介绍 价格 图片 所属种类（外键）所属店铺（外键）
module.exports = (sequelize, DataTypes) => {
  const house_post = sequelize.define('house_post', {
    name: DataTypes.STRING(50),
    price: DataTypes.STRING(50),
    picurl: DataTypes.STRING,
    description: DataTypes.STRING(200),
    count: DataTypes.INTEGER,
    sales: DataTypes.INTEGER,
    detail: DataTypes.STRING,
    disable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    clickRate: DataTypes.INTEGER
  })

  
  return good
}
