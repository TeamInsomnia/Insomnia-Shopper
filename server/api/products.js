const router = require("express").Router();
const {
  models: { Product, OrderDetails, Order },
} = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");

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
    const product = await Product.findByPk(req.params.id, {
      include: {
        model: Order,
        through: {
          OrderDetails,
        },
      },
    });
    res.send(product);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireToken, isAdmin, async (req, res, next) => {
  try {
    const productToUpdate = await Product.findByPk(req.params.id);
    const updatedProduct = await productToUpdate.update(req.body);
    res.status(201).send(updatedProduct);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireToken, isAdmin, async (req, res, next) => {
  try {
    const productToDelete = await Product.findByPk(req.params.id);
    const deletedProduct = await productToDelete.destroy();
    res.status(202).send(deletedProduct);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
