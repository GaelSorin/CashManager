import Sequelize from "sequelize";
import { AccountModel } from "../models";

export default class Account {
  private _rowid!: string;
  private _balance!: number;

  constructor() {}

  public get rowid() {
    return this._rowid;
  }

  public get balance() {
    return this._balance;
  }


  public set rowid(rowid: string) {
    this._rowid = rowid;
  }

  public set balance(balance: number) {
    this._balance = balance;
  }

  private _fromModel(model: Sequelize.Model<any, any>) {
    this._rowid = model.get("id") as string;
    this._balance = model.get("balance") as number;
  }

  public async getJSON() {
    return {
      id: this._rowid,
      balance: this._balance,
    };
  }

  public fromPurData(
    balance: number,
  ) {
    this._balance = balance;
  }


  public async find(id: string) {
    let model = await AccountModel.findOne({
      where: {
        id: id,
      },
    });
    if (!model) return null;
    this._fromModel(model);
    return model;
  }

  public async update() {
    return await AccountModel.update(
      {
        balance: this._balance,
      },
      {
        where: {
          id: this._rowid,
        },
      }
    );
  }

}
