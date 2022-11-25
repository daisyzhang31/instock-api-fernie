const knex = require("knex")(require("../knexfile"));
const { v4:uuidv4 } =require("uuid");



exports.index = (_req, res) => {
  knex("warehouses")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Warehouses: ${err}`)
    );
};

exports.inventoriesByWarehouseId = async (req, res) => {
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

exports.addWarehouse = (req, res) => {
  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    return res
      .status(400)
      .send(
        "Please make sure to provide warehouse_name, address, city, country, contact_name, contact_position, contact_phone and contact_email fields in a request"
      );
  }

  const newWarehouseId = uuidv4();
  knex("warehouses")
    .insert({ ...req.body, id: newWarehouseId })
    .then((_data) => {
      knex("warehouses")
        .where({ id: newWarehouseId })
        .then((data) => {
          res.status(201).json(data[0]);
        });
    })
    .catch((err) => res.status(400).send(`Error creating Warehouse: ${err}`));
};




