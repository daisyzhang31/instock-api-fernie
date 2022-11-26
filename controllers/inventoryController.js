const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");

exports.index = (_req, res) => {
  knex("inventories")
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving inventories: ${err}`)
    );
};

exports.inventoriesById = async (req, res) => {
  try {
    const { id } = req.params;
    const inventoriesData = await knex("inventories").where("id", id);

    res.status(200).json({ inventoriesData });
  } catch (err) {
    res.status(400).send(`Error retrieving data: ${err}`);
  }
};


exports.addInventory = (req, res) => {
  if (
    !req.body.warehouse_id ||
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    return res
      .status(400)
      .send(
        "Please provide warehouseid, itemname, description,category, status and quantity."
      );
  }
  const newInventoryId = uuidv4();

  knex("inventories")
    .insert({ ...req.body, id: newInventoryId })
    .then((_data) => {
      knex("inventories")
        .where({ id: newInventoryId })
        .then((data) => {
          res.status(201).json(data[0]);
        });
    })
    .catch((err) => res.status(400).send(`Error creating inventory:${err}`));
};

