import { Order } from '../../model/order';

export abstract class OrderRespository {
  abstract save(order: Order);
}
