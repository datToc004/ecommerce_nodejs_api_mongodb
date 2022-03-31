const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const { pagination } = require("../middleware/pagination");

const router = require("express").Router();
const OrderController = require("../controller/OrderController");

router.post("/", verifyToken, OrderController.createOrder);

router.put("/cart-order/:id", verifyTokenAndAdmin, OrderController.updateCartOrder);

router.put("/delivery-order/:id", verifyTokenAndAdmin, OrderController.updateDeliveryOrder);

router.delete("/:id", verifyTokenAndAdmin, OrderController.deleteOrder);

router.get("/find/:userId", verifyTokenAndAuthorization, OrderController.getOrderByUserId);

router.get("/all", [verifyTokenAndAdmin,pagination], OrderController.getAllOrder);

module.exports = router;
