import express from "express";
import jwt from 'jsonwebtoken';
import User from "~/class/user.class";
import bcrypt from "bcrypt";
import JWT from "~/class/jwt.class";
import { UserController } from "~/controllers/user";
const router = express.Router();

router.get('/', JWT.authToken, UserController.getUser);
router.get('/all', JWT.authToken, UserController.getUserAll);
router.post('/', JWT.authToken, UserController.createUser);
router.put('/', JWT.authToken, UserController.updateUser);
router.patch('/', JWT.authToken, UserController.updateUser);
router.get('/:id', JWT.authToken, UserController.getUserById);
router.put('/:id', JWT.authToken, UserController.updateUserById);
router.patch('/:id', JWT.authToken, UserController.updateUserById);
router.delete('/:id', JWT.authToken, UserController.deleteUser);

export default router;