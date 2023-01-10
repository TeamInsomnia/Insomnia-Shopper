/* cart model? do we even NEED this? how would it look? Let's explore...
NOTE: this will be a "through-table."
*/

const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Cart;
