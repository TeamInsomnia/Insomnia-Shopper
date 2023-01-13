const Sequelize = require("sequelize");
const db = require("../db");
const Product = require("./Product");
const Order = require("./Order");

const OrderDetails = db.define("orderDetails", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  quantityPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

const updateQuantityPrice = async (instance) => {
  const product = await Product.findByPk(instance.productId);
  // const orders = await OrderDetails.findAll({
  //   where: {
  //     orderId: instance.orderId
  //   }
  // });
  // const sum = await orders.sum('quantityPrice');
  // console.log(sum);
  instance.quantityPrice = product.price * instance.quantity;
  // orders.totalPrice = await orders.sum('quantityPrice');
};

OrderDetails.beforeCreate(updateQuantityPrice);
OrderDetails.beforeUpdate(updateQuantityPrice);

module.exports = OrderDetails;
