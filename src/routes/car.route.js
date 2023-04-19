import { Router } from 'express';
import * as carController from '../controllers/car.controller.js';
import requireUser from '../middlewares/auth.js';

const carRouter = Router();

carRouter.post('/', requireUser, carController.addCar);
carRouter.get('/', carController.getAllCars);
carRouter.get('/:id', carController.getCar);
carRouter.put('/:id', requireUser, carController.updateCar);
carRouter.delete('/:id', requireUser, carController.deleteCar);

export default carRouter;
