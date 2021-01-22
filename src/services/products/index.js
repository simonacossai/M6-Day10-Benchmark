const express = require("express");
const Product = require("../../db").Product;
const Category = require("../../db").Category;
const Review = require("../../db").Review;
const { Op } = require("sequelize");
const router = express.Router();
const multer = require("multer")
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const upload = multer({});


const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
      folder: "products"
  }
})
const cloudMulter =  multer({ storage: cloudStorage})

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findAll({
        include: [{
          model: Category,
          where: req.query.category
          ? {
              name: { [Op.iLike]: "%" + req.query.category + "%" },
            }
          : {},
        },
      { 
        model: Review,
      }],
      where: req.query.title
      ? { name: { [Op.iLike]: "%" + req.query.title + "%" } }
      : {},
      });
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newElement = await Product.create(req.body);
      res.send(newElement);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findByPk(req.params.id);
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedData = await Product.update(req.body, {
        returning: true,
        plain: true,
        where: {
          id: req.params.id,
        },
      });
      res.send(updatedData[1]);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      Product.destroy({ where: { id: req.params.id } }).then((rowsDeleted) => {
        if (rowsDeleted > 0) res.send("Deleted");
        else res.send("no match");
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

  router.put("/:id/upload", cloudMulter.single("productImage"), async (req, res, next) =>{
    try {
      const newImage = { ...req.body, date: new Date() }
        Product.update(
          {imageUrl: req.file.path},
          {returning: true, where: {id: req.params.id} }
        )
      console.log(req.file, "AAAAAAAAA")
      res.status(201).send("upadated")
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

module.exports = router;