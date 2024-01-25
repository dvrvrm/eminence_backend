const express = require('express');
const productsController = require("../controllers/products-controller");
const {isTokenValid} = require("../middlewares/auth-middleware");

const router = express.Router();

router.get('/products', isTokenValid, productsController.getproducts);

module.exports = router;
