import { cars } from "@prisma/client";
import prisma from "../config/database.js";
import { CarsType } from "../protocols/index.js";

async function getCars(): Promise<cars[]> {
  return prisma.cars.findMany();
}

async function getCar(id: number): Promise<cars> {
  return prisma.cars.findFirst({
    where: {
      id: id,
    },
  });
}

async function getCarWithLicensePlate(licensePlate: string): Promise<cars> {
  return prisma.cars.findFirst({
    where: {
      licensePlate: licensePlate,
    },
  });
}

async function createCar(car: CarsType) {
  return prisma.cars.create({
    data: car,
  });
}

async function deleteCar(id: number) {
  return prisma.cars.delete({
    where: {
      id: id,
    },
  });
}

const carRepository = {
  getCar,
  getCarWithLicensePlate,
  getCars,
  createCar,
  deleteCar,
};

export default carRepository;
