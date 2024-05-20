import express from "express";
import JWT from "~/class/jwt.class";
import { tpeController } from "~/controllers/tpe";
const router = express.Router();

router.get('/all', tpeController.getTpeAll);

export default router;