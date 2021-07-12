import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne
} from 'typeorm';

import { DishEntity } from 'src/infraestructura/dish/entity/dish.entidad';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  mesa: number;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => DishEntity, (dish) => dish.order, { nullable: true })
  dish: DishEntity;
}
