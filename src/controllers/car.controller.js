import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger.js';
import { addCarValidation } from '../validation/car.validation.js';

const prisma = new PrismaClient();

export async function getAllCars(req, res) {
  try {
    const cars = await prisma.car.findMany();
    logger.info('Success to get all cars');
    res.status(200).json({
      status: 200,
      data: cars,
    });
  } catch (error) {
    logger.error(error);
    res.json({
      message: 'Something went error',
    });
  }
}

export async function addCar(req, res) {
  const { error, value } = addCarValidation(req.body);

  if (error) {
    logger.error(error);
    res.json({
      message: 'validation error',
    });
  } else {
    try {
      const car = await prisma.car.create({
        data: {
          name: value.name,
          brand: value.brand,
          color: value.color,
          for_sale: value.for_sale,
          Owner: { connect: { email: value.carOwner } },
        },
      });
      logger.info('New car added');
      res.status(201).json({
        status: 201,
        data: car,
      });
    } catch (error) {
      logger.error(error);
      res.status(422).json({
        message: 'Failed to add new car',
      });
    }
  }
}

export async function getCar(req, res) {
  const { id } = req.params;

  try {
    const car = await prisma.car.findUnique({
      where: { id: String(id) },
    });
    if (!car) {
      logger.error('False ID');
      res.status(404).json({
        status: 404,
        message: 'You put a wrong id',
      });
    } else {
      logger.info('Success to get a car');
      res.status(200).json({
        status: 200,
        data: car,
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(422).json({
      message: 'Failed to get a car',
    });
  }
}

export async function updateCar(req, res) {
  const { id } = req.params;
  const { name, brand, color, for_sale, carOwner } = req.body;

  try {
    const findCar = await prisma.car.findUnique({
      where: { id: String(id) },
    });
    if (!findCar) {
      logger.error(error);
      res.status(404).json({
        message: 'You put a wrong ID',
      });
    } else {
      const car = await prisma.car.update({
        where: { id: String(id) },
        data: {
          name,
          brand,
          color,
          for_sale,
          Owner: { connect: { email: carOwner } },
        },
      });
      logger.info('Car has been updated');
      res.status(200).json({
        status: 200,
        message: 'Success update a car',
        data: car,
      });
    }
  } catch (error) {
    logger.error(error);
    res.json({
      message: 'Something is error',
    });
  }
}

export async function deleteCar(req, res) {
  const { id } = req.params;

  try {
    const findCar = await prisma.car.findUnique({
      where: { id: String(id) },
    });
    if (!findCar) {
      logger.error(error);
      res.status(404).json({
        message: 'You put a wrong ID',
      });
    } else {
      await prisma.car.delete({
        where: { id: String(id) },
      });
      res.status(200).json({
        status: 200,
        message: 'A car has been deleted',
      });
    }
  } catch (error) {
    logger.error(error);
    res.json({
      message: 'Failed to delete a car',
    });
  }
}
