import { OrderEntity } from 'src/infraestructura/order/entity/order.entidad';

export abstract class DaoOrder {
  abstract toList(): Promise<OrderEntity[]>;
  abstract byId(id): Promise<OrderEntity>;
  abstract remove(id: number): Promise<void>;
}