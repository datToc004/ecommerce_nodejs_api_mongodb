const router = require("express").Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const UserController = require("../controller/UserController");


router.put("/:id", verifyTokenAndAuthorization, UserController.updateUser);

router.delete("/dele/:id", verifyTokenAndAuthorization, UserController.deleteUser);

router.get("/find/:id", verifyTokenAndAdmin, UserController.showUser);

router.get("/all", verifyTokenAndAdmin, UserController.showAllUser);
module.exports = router;
