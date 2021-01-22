const express = require("express");
const Product = require("../../db").Product;
const Category = require("../../db").Category;
const Cart = require("../../db").Cart;
const User = require("../../db").User;
const { Op, Sequelize } = require("sequelize");
const router = express.Router();

router.route("/:userId").get(async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      include: [{ model: Product, include: [Category] }, User],
      where: { userId: req.params.userId },
    });

    res.send({ products: cart });
  } catch (e) {
    console.log(e);
    next(e);
  }
});
router
  .route("/:userId/:productId")
  .post(async (req, res, next) => {
    try {
      const newRow = await Cart.create({
        userId: req.params.userId,
        productId: req.params.productId,
      });
      res.send(newRow);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  
  router.route("/:id").delete(async (req, res, next) => {
    try {
      Cart.destroy({ where: { id: req.params.id }}).then((rowsDeleted) => {
        if (rowsDeleted > 0) res.send("Deleted");
        else res.send("no match");
      });
      res.send("deleted")
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

module.exports = router;