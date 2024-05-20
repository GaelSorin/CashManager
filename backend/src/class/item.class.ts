import Sequelize from "sequelize";
import { ItemModel } from "../models";

export default class Item {
  private _rowid!: string;
  private _name!: string;
  private _price!: number;
  private _image!: string;
  private _id_user!: string;

  constructor() {}

  public get rowid() {
    return this._rowid;
  }

  public get name() {
    return this._name;
  }

  public get price() {
    return this._price;
  }

  public get image() {
    return this._image;
  }

  public get id_user() {
    return this._id_user;
  }

  public set rowid(rowid: string) {
    this._rowid = rowid;
  }

  public set name(name: string) {
    this._name = name;
  }

  public set price(price: number) {
    this._price = price;
  }

  public set image(image: string) {
    this._image = image;
  }

  public set id_user(id_user: string) {
    this._id_user = id_user;
  }

  private _fromModel(model: Sequelize.Model<any, any>) {
    this._rowid = model.get("id") as string;
    this._name = model.get("name") as string;
    this._price = model.get("price") as number;
    this._image = model.get("image") as string;
    this._id_user = model.get("id_user") as string;
  }

  public async getJSON() {
    return {
      id: this._rowid,
      name: this._name,
      price: this._price,
      image: this._image,
      id_user: this._id_user,
    };
  }

  public fromPurData(
    name: string,
    price: number,
    rowid: string = "",
    image: string = "",
    id_user: string = ""
  ) {
    this._name = name;
    this._price = price;
    this._rowid = rowid;
    this._image = image;
    this._id_user = id_user;
  }

  public async create() {
    return await ItemModel.create({
      name: this._name,
      price: this._price,
      image: this.image,
      id_user: this._id_user,
    });
  }

  public async clone() {
    return await ItemModel.create({
      name: this._name,
      price: this._price,
      image: this.image,
      id_user: this._id_user,
    });
  }

  public async find(id: string) {
    let model = await ItemModel.findOne({
      where: {
        id: id,
      },
    });
    if (!model) return null;
    this._fromModel(model);
    return model;
  }

  public async findAll(id_user: string) {
    return await ItemModel.findAll({
      order: [["name", "ASC"]],
      where: {
        id_user: id_user,
      },
    });
  }

  public async update() {
    return await ItemModel.update(
      {
        name: this._name,
        price: this._price,
        id_user: this._id_user,
      },
      {
        where: {
          id: this._rowid,
          id_user: this._id_user,
        },
      }
    );
  }

  public async delete() {
    return await ItemModel.destroy({
      where: {
        id: this._rowid,
      },
    });
  }
}
