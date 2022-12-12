import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository"

export default() => {

  const categoriesRepository = null;
  const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
  const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);
  return listCategoriesController;
}
