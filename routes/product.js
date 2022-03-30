const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();
const ProductController = require("../controller/ProductController");



router.post("/", verifyTokenAndAdmin, ProductController.createPr);


router.put("/:id", verifyTokenAndAdmin, ProductController.updatePr);


router.delete("/:id", verifyTokenAndAdmin, ProductController.deletePr);


router.get("/find/:id", ProductController.showPr);

router.get("/all", ProductController.showAllPr);

module.exports = router;
