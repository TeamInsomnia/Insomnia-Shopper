const router = require("express").Router();
const {
  models: { Order, OrderDetails },
} = require("../db");
const Product = require("../db/models/Product");

router.post("/", async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).send(newOrder);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const currentOrder = await Order.findOne({
      where: {
        purchased: false,
        userId: req.params.id,
      },
      include: {
        model: Product,
        through: {
          OrderDetails,
        },
      },
    });
    res.send(currentOrder);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
