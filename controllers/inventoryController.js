const knex = require("knex")(require("../knexfile"));

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
    !req.body.status
  ) {
    return res
      .status(400)
      .send(
        "Please make sure to provide warehouse_name, item-name,description,category,and status in a request"
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
    .catch((err) => res.status(400).send(`Error creating Inventory: ${err}`));
};


// exports.updateInventory = (req, res) => {
//   if (
//     !req.body.id ||
//     !req.body.warehouse_id ||
//     !req.body.item_name ||
//     !req.body.description ||
//     !req.body.category ||
//     !req.body.status ||
//     !req.body.quantity ||
//     !req.body.created_at ||
//     !req.body.updated_at
//   ) {
//     return res
//       .status(400)
//       .send(
//         "Please make sure to provide warehouse_name, address, city, country, contact_name, contact_position, contact_phone and contact_email fields in a request"
//       );
//   }

//   knex("inventories");
//   const obj = {
//     id: req.body.id,
//     warehouse_id: req.body.warehouse_id,
//     item_name: req.body.item_name,
//     description: req.body.description,
//     category: req.body.category,
//     status: req.body.status,
//     quantity: req.body.quantity,
//     created_at: req.body.created_at,
//     updated_at: req.body.updated_at,
//   }
//     .update(obj)
//     .where({ id: req.params.id })
//     .then((_data) => {
//       knex("inventories")
//         .where({ id: req.params.id })
//         .then((data) => {
//           res.status(200).json(data[0]);
//         });
//     })
//     .catch((err) =>
//       res.status(400).send(`Error updating Warehouse ${req.params.id} ${err}`)
//     );
// };
