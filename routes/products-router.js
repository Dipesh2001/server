const express = require("express");
const {
  getAllProducts,
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} = require("../controllers/products-controller");

const router = express.Router();

router.route("/getAllProducts").get(getAllProducts);
router.route("/addProduct").post(addProduct);
router.route("/deleteProduct/:id").delete(deleteProduct);
router.route("/getProduct/:id").get(getProduct);
router.route("/updateProduct/:id").put(updateProduct);

module.exports = router;
