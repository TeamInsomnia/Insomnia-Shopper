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

const updateOrderDetails = async (instance) => {
  const product = await Product.findByPk(instance.productId);
  const order = await Order.findByPk(instance.orderId);
  instance.quantity++;
  instance.quantityPrice = product.price * instance.quantity;
  order.totalPrice += instance.quantityPrice;
  await order.save();
};

OrderDetails.beforeCreate(updateOrderDetails);
OrderDetails.beforeUpdate(updateOrderDetails);

module.exports = OrderDetails;
