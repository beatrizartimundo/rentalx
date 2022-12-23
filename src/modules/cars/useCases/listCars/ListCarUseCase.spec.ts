import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";


let listCarsUseCase: ListCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
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

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async() => {
    const car = await carsRepositoryInMemory.create({
      name:"car_name2",
      brand:"car_brand_test",
      category_id:"category_id",
      daily_rate: 300,
      description:"car_description",
      fine_amount: 120,
      license_plate:"license_plate",
    });

    const cars = await listCarsUseCase.execute({
      brand: "car_brand",
    });

    expect(cars).toEqual([car]);
  });
});