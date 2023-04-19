import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);
userRouter.post('/refresh', userController.refreshSession);
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUser);

export default userRouter;
