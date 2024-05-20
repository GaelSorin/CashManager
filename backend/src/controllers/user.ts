import User from "~/class/user.class";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import JWT from "~/class/jwt.class";

export const UserController = {
  async getUser(req: any, res: any) {
    const user = new User();
    const requestStatus = await user.find(req.user.id);

    if (!requestStatus) {
      res.status(404).send("User not found");
      return;
    } else {
      res.status(200).send(user);
      return;
    }
  },

  async createUser(req: any, res: any) {
    const user = new User();
    const requestStatus = await user.find(req.user.id);

    if (!requestStatus) {
      res.status(404).send("User not found");
      return;
    } else {
      const { name, password, email } = req.body;
      if (!name && !password && !email) {
        res.status(400).json({ code: 0x6 });
        return;
      } else if (!name) {
        res.status(400).json({ code: 0x4 });
        return;
      } else if (!password) {
        res.status(400).json({ code: 0x3 });
        return;
      } else if (!email) {
        res.status(400).json({ code: 0x2 });
        return;
      }
      let user = new User();
      if ((await user.isMailRegistered(email)) === true) {
        res.status(403).json({ code: 0x2 });
        return;
      }
      user.fromPurData(name, password, email);
      let userModel = await user.create();
      res.send({ msg: "Created successfully" });
    }
  },

  async getUserAll(req: any, res: any) {
    const user = new User();
    const requestStatus = await user.find(req.user.id);

    if (!requestStatus) {
      res.status(404).send("User not found");
      return;
    } else {
      const users = await user.findAll();
      res.status(200).send(users);
      return;
    }
  },

  async getUserById(req: any, res: any) {
    const user = new User();
    const requestStatus = await user.find(req.params.id);
    if (!requestStatus) {
      res.status(404).send("User not found");
      return;
    } else {
      res.status(200).send(user);
      return;
    }
  },

  async updateUser(req: any, res: any) {
    const user = new User();
    const requestStatus = await user.find(req.user.id);
    if (!requestStatus) {
      res.status(404).send("User not found");
      return;
    } else {
      user.name = req.body.name ? req.body.name : user.name;
      user.email = req.body.email ? req.body.email : user.email;
      user.password = req.body.password ? req.body.password : user.password;
      await user.update();
      res.status(200).send(user);
      return;
    }
  },

  async updateUserById(req: any, res: any) {
    const user = new User();
    const requestStatus = await user.find(req.params.id);
    if (!requestStatus) {
      res.status(404).send("User not found");
      return;
    } else {
      user.name = req.body.name ? req.body.name : user.name;
      user.email = req.body.email ? req.body.email : user.email;
      user.password = req.body.password ? req.body.password : user.password;
      await user.update();
      res.status(200).send(user);
      return;
    }
  },

  async deleteUser(req: any, res: any) {
    const user = new User();
    const requestStatus = await user.find(req.params.id);
    if (!requestStatus) {
      res.status(404).send("User not found");
      return;
    } else {
      await user.delete();
      res.status(200).send("User deleted");
      return;
    }
  },
};
