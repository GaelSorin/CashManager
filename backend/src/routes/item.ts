import express from "express";
import JWT from "~/class/jwt.class";
import { ItemController } from "~/controllers/item";
const router = express.Router();

router.get('/', JWT.authToken, ItemController.getItem);
router.get('/all', JWT.authToken, ItemController.getItemAll);
router.post('/', JWT.authToken, ItemController.createItem);
router.put('/', JWT.authToken, ItemController.updateItem);
router.patch('/', JWT.authToken, ItemController.updateItem);
router.get('/:id', JWT.authToken, ItemController.getItemById);
router.put('/:id', JWT.authToken, ItemController.updateItemById);
router.patch('/:id', JWT.authToken, ItemController.updateItemById);
router.delete('/:id', JWT.authToken, ItemController.deleteItem);

export default router;