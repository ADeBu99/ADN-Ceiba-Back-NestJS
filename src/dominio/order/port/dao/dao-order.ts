import { OrderEntity } from 'src/infraestructura/order/entity/order.entidad';

export abstract class DaoOrder {
  abstract async toList(): Promise<OrderEntity[]>;
  abstract async byId(id): Promise<OrderEntity>;
  abstract async remove(id: number): Promise<void>;
}