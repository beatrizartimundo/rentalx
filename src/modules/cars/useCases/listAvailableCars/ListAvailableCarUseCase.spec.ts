import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";


let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async() => {
    const car = await carsRepositoryInMemory.create({
      name:"car_name",
      brand:"car_brand",
      category_id:"category_id",
      daily_rate: 300,
      description:"car_description",
      fine_amount: 120,
      license_plate:"license_plate",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async() => {
    const car = await carsRepositoryInMemory.create({
      name:"car_name2",
      brand:"car_brand_test",
      category_id:"category_id",
      daily_rate: 300,
      description:"car_description",
      fine_amount: 120,
      license_plate:"license_plate",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "car_brand",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async() => {
    const car = await carsRepositoryInMemory.create({
      name:"car_name3",
      brand:"car_brand_test",
      category_id:"category_id",
      daily_rate: 300,
      description:"car_description",
      fine_amount: 120,
      license_plate:"license_plate",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name:"car_name3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async() => {
    const car = await carsRepositoryInMemory.create({
      name:"car_name4",
      brand:"car_brand_test",
      category_id:"12345",
      daily_rate: 300,
      description:"car_description",
      fine_amount: 120,
      license_plate:"license_plate",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id:"12345",
    });

    expect(cars).toEqual([car]);
  });
});