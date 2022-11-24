const knex = require("knex")(require("../knexfile"));

exports.index = (_req, res) => {
  knex("warehouses")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Warehouses: ${err}`)
    );
};

exports.inventoriesById = async (req, res) => {
  try {
    const { id } = req.params;
    const inventoriesData = await knex("inventories").where("warehouse_id", id);

    res.status(200).json({ inventoriesData });
  } catch (err) {
    res.status(400).send(`Error retrieving data: ${err}`);
  }
};

exports.warehouseById = async (req, res) => {
  try {
    const { id } = req.params;
    const warehouseData = await knex("warehouses").where("id", id);
    res.status(200).json({ warehouseData });
  } catch (err) {
    res.status(400).send(`Error retrieving data: ${err}`);
  }
};
