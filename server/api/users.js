const router = require("express").Router();
const {
  models: { User, Order },
} = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");

router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "isAdmin"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.send(newUser);
  } catch (err) {
    next(err);
  }
});

router.get("/history/:id", async(req, res, next)=>{
  try{
    const userWithHistory = await User.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Order,
        where: {
          purchased: true
        }
      },
    });
    res.send(userWithHistory);
  }
  catch(err){
    next(err)
  }
})

module.exports = router;
