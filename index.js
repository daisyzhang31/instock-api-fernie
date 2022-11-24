require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5050;
const warehouseRoutes = require("./routes/warehouse");
const inventoryRoutes = require("./routes/inventory");
const cors=require("cors");



app.get("/", (req, res) => {
  res.send("Welcome to my API");
});
app.use(cors());
app.use("/warehouses", warehouseRoutes);
app.use("/inventories", inventoryRoutes);

app.listen(PORT, () => {

  console.log(`running at http://localhost:${PORT}`);
});
