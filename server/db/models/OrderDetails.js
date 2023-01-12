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
  instance.quantityPrice = product.price * instance.quantity;
};

OrderDetails.beforeCreate(updateQuantityPrice);
OrderDetails.beforeUpdate(updateQuantityPrice);

module.exports = OrderDetails;
