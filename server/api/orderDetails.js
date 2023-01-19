const router = require("express").Router();
const {
  models: { OrderDetails },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const orders = await OrderDetails.findAll();
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { orderId, productId, quantity } = req.body;
    const order = await OrderDetails.findOne({
      where: {
        orderId: orderId,
        productId: productId,
      },
    });
    await order.update({ quantity: quantity });
    await order.save();
    res.send(order);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.send(await OrderDetails.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const order = await OrderDetails.findAll({
      where: {
        orderId: req.params.id,
      },
    });
    res.send(order);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const orderDetail = await OrderDetails.findOne({
      where: {
        productId: req.params.id,
      },
    });
    res.status(202).send(await orderDetail.destroy());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
