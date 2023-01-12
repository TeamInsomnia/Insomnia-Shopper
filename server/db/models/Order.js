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

// need to make function to updateTotalPrice
// grab order by orderId, only the quantity price columns, add them all up? 

module.exports = Order;
