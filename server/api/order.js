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

router.put("/:id", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        purchased: false,
        userId: req.params.id,
      },
    });
    await order.update({ purchased: true });
    await order.save();
    res.send(order);
  } catch (err) {
    next(err);
  }
});

router.put("/price/:id", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        purchased: false,
        userId: req.params.id,
      },
    });
    await order.update({ totalPrice });
    await order.save();
    res.send(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
