const router = require("express").Router();
const {
  models: { Product, OrderDetails, Order },
} = require("../db");

// this "Manifests" from xyz.com/api/products/.
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: {
        model: Order, 
        through: {
          OrderDetails
        }
    }});
    res.send(product);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
