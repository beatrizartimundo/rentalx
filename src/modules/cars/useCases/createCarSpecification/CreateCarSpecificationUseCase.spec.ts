import { AppError } from './../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';


let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory:CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create car specification", () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });


  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name:"Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate:"abc-1a55",
      fine_amount:60,
      brand: "Brand",
      category_id:"category",

    });
    const specification = await specificationsRepositoryInMemory.create({
      description: "test",
      name:"test"
    });

    const specifications_id = [specification.id];

  const specificationsCars = await createCarSpecificationUseCase.execute({car_id:car.id,specifications_id});

  expect(specificationsCars).toHaveProperty("specifications");
  expect(specificationsCars.specifications.length).toBe(1);
  });

  it("should not be able to add a new specification to the car when car not exists", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["72348","928374"];

    await createCarSpecificationUseCase.execute({car_id,specifications_id})
    }).rejects.toBeInstanceOf(AppError);
  });
});