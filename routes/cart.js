const {
    verifyToken,
    verifyTokenAndAuthorization,
} = require("../middleware/verifyToken");
const CartController = require("../controller/CartController");

const router = require("express").Router();

router.get(
    "/find/:cartId",
    verifyTokenAndAuthorization,
    CartController.getDetailCart
);

module.exports = router;
