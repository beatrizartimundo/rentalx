import { inject, injectable } from 'tsyringe';
import { AppError } from '@errors/AppError';
import { IspecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationsRepository: IspecificationRepository
    ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification Already Exists!',401);
    }
    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };