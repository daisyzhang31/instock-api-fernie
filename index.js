require("dotenv").config();
const express = require("express");
const app = express();
const warehouseRoutes = require("./routes/warehouse");
const PORT = process.env.PORT || 5050;

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.use("/warehouses", warehouseRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
