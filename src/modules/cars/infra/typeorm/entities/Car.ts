import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Category } from "./Category";
import { Specification } from "./Specification";


@Entity("cars")
class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id: string;

  //um carro pode ter mais de uma especificacao
  @ManyToMany(()=> Specification)
  @JoinTable({
    name: "specifications_cars",
    //nome da coluna da tabela de carros
    joinColumns:[{name: "car_id"}],
    //nome da coluna do many to many da tabela que esta se relacionando
    inverseJoinColumns:[{name: "specification_id"}]
  })
  specifications: Specification[];
  
  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id){
      this.id = uuidV4();
      this.available = true;
      this.created_at = new Date();
    }
  }

}

export { Car };