const Sequelize = require("sequelize");
const db = require("../db");
const Product = require("./Product");
const Order = require('./Order')

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

const updatePrice = async (instance) => {
  const product = await Product.findByPk(instance.productId);
  instance.quantityPrice = product.price * instance.quantity;
  let sum = await OrderDetails.sum('quantityPrice', {
    where: {
      orderId: instance.orderId
    }
  })
  const order = await Order.findByPk(instance.orderId);
  await order.update({totalPrice: sum});

};

OrderDetails.beforeCreate(updatePrice);
OrderDetails.afterCreate(updatePrice);
OrderDetails.beforeUpdate(updatePrice);

module.exports = OrderDetails;
