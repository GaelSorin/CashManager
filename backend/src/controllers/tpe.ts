import { TPEs } from "../index";

export const tpeController = {
  async getTpeAll(req: any, res: any) {
    if (TPEs.size > 0) {
      res.status(200).send(Array.from(TPEs.keys()));
    } else {
      res.status(404).send("User not found");
    }
  },
};
