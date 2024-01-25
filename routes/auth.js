const express = require('express');
const authController = require("../controllers/auth-controller");
const {isTokenValid} = require("../middlewares/auth-middleware");

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.signin);
router.get('/signout', isTokenValid, authController.signout);

module.exports = router;
