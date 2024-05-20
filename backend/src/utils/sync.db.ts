import { UserModel } from "../models";
import { ItemModel } from "../models";
import { AccountModel } from "../models";

export default async function syncDB() {
  await UserModel.sync().then(async () => {
    if ((await UserModel.findAll()).length === 0) {
      UserModel.bulkCreate([
        {
          id: "00c7177b-3303-4223-ad58-d274a37a0d9c",
          name: "Chercheur d'or",
          email: "gold@gmail.com",
          password:
            "$2b$10$41ygAmlyh.W3DRgxj2zf6ODbA95C5f3bByZSrXkGxQR28rYMjUgqq",
        },
        {
          id: "95a3b4a5-027e-11ef-8724-0242ac120002",
          name: "L'ordre des cranes",
          email: "skull@gmail.com",
          password:
            "$2b$10$pt4fh32Ohp2UKpfUKUPwXupI/6QrvhCk2m/6DSr4rxwsdBWQuOj.a",
        },
      ]);
    }
  });

  await ItemModel.sync().then(async () => {
    if ((await ItemModel.findAll()).length === 0) {
      ItemModel.bulkCreate([
        {
          name: "Golden Skull",
          price: "50",
          image: "https://seaofthieves.wiki.gg/images/thumb/9/93/Gold_Hoarder_Skull_Trinket.png/630px-Gold_Hoarder_Skull_Trinket.png",
          id_user: "00c7177b-3303-4223-ad58-d274a37a0d9c",
        },
        {
          name: "Ashen Chest",
          price: "150",
          image: "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/1/19/Ashen_Captain%27s_Chest.png/revision/latest/scale-to-width-down/1200?cb=20220415014953",
          id_user: "00c7177b-3303-4223-ad58-d274a37a0d9c",
        },
        {
          name: "Rage Chest",
          price: "1000",
          image: "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/6/65/Chest_of_Rage.png/revision/latest?cb=20211020180540",
          id_user: "00c7177b-3303-4223-ad58-d274a37a0d9c",
        },
        {
          name: "Chope",
          price: "10",
          image: "https://sotfr.net/wp-content/uploads/2021/06/Chope-des-damnes.png",
          id_user: "95a3b4a5-027e-11ef-8724-0242ac120002",
        },
      ]);
    }
  });

  await AccountModel.sync().then(async () => {
    if ((await AccountModel.findAll()).length === 0) {
      AccountModel.bulkCreate([
        {
          id: "040533BA926781",
          balance: "10000"
        },
      ]);
    }
  });
}
