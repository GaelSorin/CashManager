import Account from "~/class/account.class";

export const AccountController = {
  async removeMoney(id: string, amount: number) {
    const account = new Account();
    const requestStatus = await account.find(id);
    if (!requestStatus || account.balance < amount) {
      return false;
    } else {
      account.balance -= amount;
      await account.update();
      return true;
    }
  },

};
