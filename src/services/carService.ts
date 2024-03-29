import notFoundError from "../errors/notFoundError.js";
import conflictError from "../errors/conflictError.js";
import carRepository from "../repository/carRepository.js";
import { CarsType } from "../protocols/index.js";

async function getCars() {
  const cars = await carRepository.getCars();
  return cars;
}

async function getCar(id: number) {
  const car = await carRepository.getCar(id);
  if (!car) {
    throw notFoundError();
  }

  return car;
}

async function createCar(car:CarsType) {
  const carFoundWithLicensePlate = await carRepository.getCarWithLicensePlate(car.licensePlate);
  if (carFoundWithLicensePlate) {
    throw conflictError(`Car with license plate ${car.licensePlate} already registered.`)
  }

  await carRepository.createCar(car);
}

async function deleteCar(id: number) {
  await getCar(id);
  await carRepository.deleteCar(id);
}

const carService = {
  getCars,
  getCar,
  createCar,
  deleteCar
}

export default carService;