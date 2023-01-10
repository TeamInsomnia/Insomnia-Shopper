//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");

//associations shall go here! this is a MANY-TO-MANY via a Through table.
// Therefore: we need to CREATE a through table?! some sort of Join?

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.hasMany(Product);
Product.belongsTo(Cart);

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
  },
};
