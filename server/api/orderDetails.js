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

router.get("/:id", async (req, res, next) => {
  try {
    const order = await OrderDetails.findOne({
      where: {
        orderId: req.params.id,
      },
    });
    res.send(order);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  // query for orderId AND productId
  try {
    const order = await OrderDetails.findOne({
      where: {
        orderId: req.params.id,
      },
    });
    res.send(await order.update(req.body));
  } catch (err) {
    next(err);
  }
});

//

module.exports = router;
