import { Specification } from '../../entities/Specification';
import {
  IspecificationRepository,
  ICreateSpecificationDTO,
} from '../ISpecificationRepository';

class SpecificationRepository implements IspecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }
  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });
    this.specifications.push(specification);
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(
      // eslint-disable-next-line prettier/prettier
      specification => specification.name === name
    );

    return specification;
  }
}

export { SpecificationRepository };