const Sequelize = require("sequelize");
const db = require("../db");

const OrderDetails = db.define("orderDetails", {
    quantity: {
        type: Sequelize.INTEGER
    }, 
    quantityPrice: {
        type: Sequelize.INTEGER
    }
});

const calculatePrice = async (product) => {
    // need to finish querying
}

module.exports = OrderDetails;