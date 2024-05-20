import Item from "../class/item.class";

test("Item class", () => {
  const item = new Item();
  item.rowid = "1";
  item.name = "name";
  item.price = 200;
  item.image = "image";
  item.id_user = "1";
  expect(item.rowid).toBe("1");
  expect(item.name).toBe("name");
  expect(item.price).toBe(200);
  expect(item.image).toBe("image");
  expect(item.id_user).toBe("1");
});

test("Item class fromPurData method", async () => {
  const item = new Item();
  item.fromPurData("name", 300, "1", "url", "jklsf-fvnjksf-fjkdsf");
  expect(item.rowid).toBe("1");
  expect(item.name).toBe("name");
  expect(item.price).toBe(300);
  expect(item.image).toBe("url");
  expect(item.id_user).toBe("jklsf-fvnjksf-fjkdsf");
});

test("Item class getJSON method", async () => {
  const item = new Item();
  item.fromPurData("name", 300, "1", "url", "jklsf-fvnjksf-fjkdsf");
  const json = await item.getJSON();
  expect(json.id).toBe("1");
  expect(json.name).toBe("name");
  expect(json.price).toBe(300);
  expect(json.image).toBe("url");
  expect(json.id_user).toBe("jklsf-fvnjksf-fjkdsf");
});

test("Item class find method", async () => {
  // {
  //   name: "Big Mac",
  //   price: "600",
  //   image: "https://eu-images.contentstack.com/v3/assets/blt5004e64d3579c43f/blt4e32a970bffd0792/61d866010f60435c58f20a0a/big-mac.png",
  //   id_user: "00c7177b-3303-4223-ad58-d274a37a0d9c",
  // },
  const item = new Item();
  const result = await item.find("d68a8966-a00a-40c7-bbd2-4fc75d80ab30");
  expect(result).not.toBeNull();
  if (!result) return;
  expect(result.get("name")).toBe("Big Mac");
  expect(result.get("price")).toBe(600);
  expect(result.get("image")).toBe("https://eu-images.contentstack.com/v3/assets/blt5004e64d3579c43f/blt4e32a970bffd0792/61d866010f60435c58f20a0a/big-mac.png");
  expect(result.get("id_user")).toBe("00c7177b-3303-4223-ad58-d274a37a0d9c");
});

// test("Item class create and find method", async () => {
//   const item = new Item();
//   item.fromPurData("name", 300, "1", "url", "jklsf-fvnjksf-fjkdsf");
//   await item.create();
//   const itemFromDB = new Item();
//   const result = await itemFromDB.find("1");
//   expect(result).not.toBeNull();
//   if (!result) return;
//   expect(result.get("name")).toBe("name");
//   expect(result.get("price")).toBe(300);
//   expect(result.get("image")).toBe("url");
//   expect(result.get("id_user")).toBe("jklsf-fvnjksf-fjkdsf");
// });