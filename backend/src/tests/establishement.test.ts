import User from "../class/user.class";

test("User class", () => {
  const user = new User();
  user.rowid = "1";
  user.name = "name";
  user.password = "password";
  user.email = "email";
  expect(user.rowid).toBe("1");
  expect(user.name).toBe("name");
  expect(user.password).toBe("password");
  expect(user.email).toBe("email");
});

test("User class fromPurData method", () => {
    const user = new User();
    user.fromPurData("name", "password", "email");
    expect(user.name).toBe("name");
    expect(user.password).toBe("password");
    expect(user.email).toBe("email");
});

test("User class getJSON method", async () => {
    const user = new User();
    user.fromPurData("name", "password", "email");
    const json = await user.getJSON();
    expect(json.name).toBe("name");
    expect(json.password).toBe("password");
    expect(json.email).toBe("email");
});

test("User class find method", async () => {
    const user = new User();
    const result = await user.find("00c7177b-3303-4223-ad58-d274a37a0d9c");
    expect(result).not.toBeNull();
    if (!result) return;
    expect(result.get("name")).toBe("Mac do");
    expect(result.get("email")).toBe("macdo@gmail.com");
    expect(result.get("password")).toBe("$2b$10$RPc8ZG3YrVRau5noJGyoK.G4FOnOFLYzQjZ.MkJp51a6acVslBEgW");
});

test("User class findByEmail method (no password)", async () => {
    const user = new User();
    const result = await user.findByEmail("macdo@gmail.com");
    expect(result).not.toBeNull();
    if (!result) return;
    expect(result.get("id")).toBe("00c7177b-3303-4223-ad58-d274a37a0d9c");
    expect(result.get("name")).toBe("Mac do");
    expect(result.get("email")).toBe("macdo@gmail.com");
    expect(result.get("password")).toBe("$2b$10$RPc8ZG3YrVRau5noJGyoK.G4FOnOFLYzQjZ.MkJp51a6acVslBEgW");
});

test("User class findByEmail method (with password)", async () => {
    const user = new User();
    const result = await user.findByEmail("macdo@gmail.com", "$2b$10$RPc8ZG3YrVRau5noJGyoK.G4FOnOFLYzQjZ.MkJp51a6acVslBEgW");
    expect(result).not.toBeNull();
    if (!result) return;
    expect(result.get("id")).toBe("00c7177b-3303-4223-ad58-d274a37a0d9c");
    expect(result.get("name")).toBe("Mac do");
    expect(result.get("email")).toBe("macdo@gmail.com");
    expect(result.get("password")).toBe("$2b$10$RPc8ZG3YrVRau5noJGyoK.G4FOnOFLYzQjZ.MkJp51a6acVslBEgW");
});

test("User class findAll method", async () => {
    const user = new User();
    const result = await user.findAll();
    expect(result).not.toBeNull();
    if (!result) return;
    expect(result.length).toBe(2);
    expect(result[1].get("id")).toBe("00c7177b-3303-4223-ad58-d274a37a0d9c");
    expect(result[1].get("name")).toBe("Mac do");
    expect(result[1].get("email")).toBe("macdo@gmail.com");
    expect(result[1].get("password")).toBe("$2b$10$RPc8ZG3YrVRau5noJGyoK.G4FOnOFLYzQjZ.MkJp51a6acVslBEgW");
    expect(result[0].get("id")).toBe("95a3b4a5-027e-11ef-8724-0242ac120002");
    expect(result[0].get("name")).toBe("KFC");
    expect(result[0].get("email")).toBe("kfc@gmail.com");
    expect(result[0].get("password")).toBe("$2b$10$RPc8ZG3YrVRau5noJGyoK.G4FOnOFLYzQjZ.MkJp51a6acVslBEgW");
});

test("User class create & update & delete method", async () => {
    const user = new User();
    user.fromPurData("name", "password", "email");
    const result = await user.create();
    const lastId = result.get("id");
    const userFromDB = new User();
    const resultFromDB = await userFromDB.find(lastId as string);
    expect(resultFromDB).not.toBeNull();
    if (!resultFromDB) return;
    expect(resultFromDB.get("name")).toBe("name");
    expect(resultFromDB.get("email")).toBe("email");
    // expect(resultFromDB.get("password")).toBe("password"); // cela n'est jamais vrai car le mot de passe est hashé

    // update
    userFromDB.fromPurData("new name", "new password", "new email", lastId as string);
    await userFromDB.update();
    const resultFromDBUpdated = await userFromDB.find(lastId as string);
    expect(resultFromDBUpdated).not.toBeNull();
    if (!resultFromDBUpdated) return;
    expect(resultFromDBUpdated.get("name")).toBe("new name");
    expect(resultFromDBUpdated.get("email")).toBe("new email");
    // expect(resultFromDBUpdated.get("password")).toBe("new password"); // cela n'est jamais vrai car le mot de passe est hashé

    // delete
    await userFromDB.delete();
    const resultFromDBDeleted = await userFromDB.find(lastId as string);
    expect(resultFromDBDeleted).toBeNull();
});

test("User class isMailRegistered method", async () => {
    const user = new User();
    const result = await user.isMailRegistered("kfc@gmail.com");
    expect(result).toBe(true);

    const user2 = new User();
    const result2 = await user2.isMailRegistered("fsdfsf@gmail.com");
    expect(result2).toBe(false);
});