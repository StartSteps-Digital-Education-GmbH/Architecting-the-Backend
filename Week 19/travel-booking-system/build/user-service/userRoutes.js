import { Router } from "express";
import userController from "./userController.js";
const router = Router();
//CRUD
router.get('/', userController.get);
router.get('/:id', userController.getByID);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);
export default router;
