import { container } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { IspecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/repositories/CarsRepository";


container.registerSingleton<ICategoriesRepository>("CategoriesRepository",CategoriesRepository);

container.registerSingleton<IspecificationRepository>("SpecificationRepository",SpecificationRepository);

container.registerSingleton<IUsersRepository>("UsersRepository",UsersRepository);

container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsRepository
);