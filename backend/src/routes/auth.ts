import express from "express";
import JWT from "~/class/jwt.class";
import { AuthController } from "~/controllers";
const router = express.Router();

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/register', AuthController.register);
router.get('/', JWT.authToken, AuthController.getAuthedUser);

export default router;
