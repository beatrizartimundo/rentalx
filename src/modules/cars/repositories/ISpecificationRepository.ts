import { Specification } from '../entities/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
interface IspecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { IspecificationRepository, ICreateSpecificationDTO };