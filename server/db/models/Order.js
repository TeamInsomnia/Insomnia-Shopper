const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  purchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

Order.setIsPurchased = () => {
  this.purchased = true;
};

module.exports = Order;
