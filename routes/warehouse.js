const router = require("express").Router();
const warehouseController = require("../controllers/warehouseController");

router.route("/").get(warehouseController.index);
router
  .route("/:id/inventories")
  .get(warehouseController.inventoriesByWarehouseId);
router.route("/:id").get(warehouseController.warehouseById);


router
  .route("/:id")
  // .get(warehouseController.singleWarehouse)
  // .put(warehouseController.updateWarehouse)
  .delete(warehouseController.deleteWarehouse);

module.exports = router;

