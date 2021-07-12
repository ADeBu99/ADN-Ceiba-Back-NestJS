import { Order } from '../../model/order';

export abstract class OrderRespository {
  abstract async save(order: Order);
}
