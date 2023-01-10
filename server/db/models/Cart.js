const Sequelize = require("sequelize");
const db = require("../db");
/*
######## NOTE AT 1/10, 4:04PM: INSOMNIA SHALL RETURN TO THIS CART CONCEPT LATER. FOR NOW,
WE FOCUS ON WIREFRAME AND DEPLOY.
*/
/* cart model? do we even NEED this? how would it look? Let's explore...
NOTE: this will be a "through-table."

// this through-table will AUTO-bring-in user ID and product ID

/*
CART will need these attributes:

>> qty of item (e.g. chairs: 8)
>> total price of all cart items 
*/

const Cart = db.define("cart", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = Cart;
