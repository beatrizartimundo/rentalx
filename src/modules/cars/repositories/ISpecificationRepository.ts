import { Specification } from '../entities/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
interface IspecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): void;
  findByName(name: string): Specification;
}

export { IspecificationRepository, ICreateSpecificationDTO };