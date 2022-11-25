const router = require("express").Router();
const warehouseController = require("../controllers/warehouseController");


.put(warehouseController.updateWarehouse);
=======
router
.route("/")
.get(warehouseController.index)
.post(warehouseController.addWarehouse);

router
  .route("/:id/inventories")
  .get(warehouseController.inventoriesByWarehouseId);
router.route("/:id")
.get(warehouseController.warehouseById)
.put(warehouseController.updateWarehouse);








module.exports = router;
