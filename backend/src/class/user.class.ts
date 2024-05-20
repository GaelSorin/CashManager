import Sequelize from "sequelize";
import { UserModel } from "../models";

export default class User {
  private _rowid!: string;
  private _name!: string;
  private _password!: string;
  private _email!: string;

  constructor() {}

  public get rowid() {
    return this._rowid;
  }

  public get name() {
    return this._name;
  }

  public get password() {
    return this._password;
  }

  public get email() {
    return this._email;
  }

  public set rowid(rowid: string) {
    this._rowid = rowid;
  }

  public set name(name: string) {
    this._name = name;
  }

  public set password(password: string) {
    this._password = password;
  }

  public set email(email: string) {
    this._email = email;
  }

  private _fromModel(model: Sequelize.Model<any, any>) {
    this._rowid = model.get("id") as string;
    this._name = model.get("name") as string;
    this._password = model.get("password") as string;
    this._email = model.get("email") as string;
  }

  public async getJSON() {
    return {
      id: this._rowid,
      name: this._name,
      email: this._email,
      password: this._password,
    };
  }

  public fromPurData(
    name: string,
    password: string,
    email: string,
    rowid: string = ""
  ) {
    this._name = name;
    this._password = password;
    this._email = email;
    this._rowid = rowid;
  }

  public async create() {
    return await UserModel.create({
      name: this._name,
      password: this._password,
      email: this._email,
    });
  }

  public async find(id: string) {
    let model = await UserModel.findOne({
      where: {
        id: id,
      },
    });
    if (!model) return null;
    this._fromModel(model);
    return model;
  }

  public async findByEmail(email: string, password?: string) {
    console.log("password user call : " + password);
    if (password) {
      let model = await UserModel.findOne({
        where: {
          email: email,
          password: password,
        },
      });
      if (!model) return null;
      this._fromModel(model);
      return model;
    }
    let model = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (!model) return null;
    this._fromModel(model);
    return model;
  }

  public async findAll() {
    return await UserModel.findAll({
      order: [
        ["name", "ASC"],
      ],
    });
  }

  public async update() {
    return await UserModel.update(
      {
        email: this._email,
        name: this._name,
        password: this._password,
      },
      {
        where: {
          id: this._rowid,
        },
      }
    );
  }

  public async delete() {
    return await UserModel.destroy({
      where: {
        id: this._rowid,
      },
    });
  }

  public async isMailRegistered(email: string) {
    let model = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (!model) return false;
    return true;
  }
}
