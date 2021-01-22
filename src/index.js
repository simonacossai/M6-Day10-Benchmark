const express = require("express");
require("dotenv").config();
const listEndpoints = require('express-list-endpoints')
const productsRouter = require("./services/products");
const cartsRouter = require("./services/cart");
const userRouter = require("./services/user");
const reviewRouter = require("./services/reviews");
const db = require("./db");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json());
server.use("/products", productsRouter);
server.use("/cart", cartsRouter);
server.use("/user", userRouter);
server.use("/reviews", reviewRouter);


console.log(listEndpoints(server));
db.sequelize.sync({ force: false }).then((result) => {
  server.listen(process.env.PORT || 3001, () => {
    console.log("server is running onn port ", process.env.PORT || 3001);
  });
});