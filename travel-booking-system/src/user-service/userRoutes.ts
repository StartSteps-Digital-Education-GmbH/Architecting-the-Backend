import { Router } from "express";
import userController from "./userController.js";
import userMiddleware from './middlewares.js'

const router  = Router();
console.log("request came here");
//CRUD
router.get('/', userController.get);
router.get('/:id', userController.getByID);
router.post('/', userMiddleware.userValidation, userMiddleware.userVallidationHandler, userController.create);
router.put('/:id',userMiddleware.userValidation, userMiddleware.userVallidationHandler,  userController.update);
router.delete('/:id', userController.remove);

export default router;