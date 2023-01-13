const router = require("express").Router();
const {
  models: { Product, User },
} = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");

// this "Manifests" from xyz.com/api/products/.
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).send(newProduct);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(product);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

module.exports = router;
