import User from "~/class/user.class";
import Item from "~/class/item.class";

export const ItemController = {
  async getItem(req: any, res: any) {
    const item = new Item();
    const requestStatus = await item.find(req.item.id);

    if (!requestStatus) {
      res.status(404).send("Item not found");
      return;
    } else {
      res.status(200).send(item);
      return;
    }
  },

  async createItem(req: any, res: any) {
    const item = new Item();
    const requestStatus = await item.find(req.item.id);

    if (!requestStatus) {
      res.status(404).send("Item not found");
      return;
    } else {
      const { name, price, id_user } = req.body;
      if (!name && !price && !id_user) {
        res.status(400).json({ code: 0x5 });
        return;
      } else if (!id_user) {
        res.status(400).json({ code: 0x4 });
        return;
      } else if (!name) {
        res.status(400).json({ code: 0x3 });
        return;
      } else if (!price) {
        res.status(400).json({ code: 0x2 });
        return;
      }
      let item = new Item();
      item.fromPurData(name, price, id_user);
      let itemModel = await item.create();
      res.send({ msg: "Created successfully" });
    }
  },

  async getItemAll(req: any, res: any) {
    let user = new User();
    if (req.user) {
      const result = await user.find(req.user.id);
      if (!result) {
        res.status(404).send("User not found");
        return;
      } else {
        const item = new Item();
        const items = await item.findAll(req.user.id);

        if (!items) {
          res.status(404).send("Item not found");
          return;
        } else {
          res.status(200).send(items);
          return;
        }
      }
    } else {
      res.status(404).send("User not found");
      return;
    }
  },

  async getItemById(req: any, res: any) {
    const item = new Item();
    const requestStatus = await item.find(req.params.id);
    if (!requestStatus) {
      res.status(404).send("Item not found");
      return;
    } else {
      res.status(200).send(item);
      return;
    }
  },

  async updateItem(req: any, res: any) {
    const item = new Item();
    const requestStatus = await item.find(req.item.id);
    if (!requestStatus) {
      res.status(404).send("Item not found");
      return;
    } else {
      item.name = req.body.name ? req.body.name : item.name;
      item.price = req.body.price ? req.body.price : item.price;
      item.id_user = req.body.id_user
        ? req.body.id_user
        : item.id_user;
      await item.update();
      res.status(200).send(item);
      return;
    }
  },

  async updateItemById(req: any, res: any) {
    const item = new Item();
    const requestStatus = await item.find(req.params.id);
    if (!requestStatus) {
      res.status(404).send("Item not found");
      return;
    } else {
      item.name = req.body.name ? req.body.name : item.name;
      item.price = req.body.price ? req.body.price : item.price;
      item.id_user = req.body.id_user
        ? req.body.id_user
        : item.id_user;
      await item.update();
      res.status(200).send(item);
      return;
    }
  },

  async deleteItem(req: any, res: any) {
    const item = new Item();
    const requestStatus = await item.find(req.params.id);
    if (!requestStatus) {
      res.status(404).send("Item not found");
      return;
    } else {
      await item.delete();
      res.status(200).send("Item deleted");
      return;
    }
  },
};
