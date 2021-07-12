import { OrderRespository } from '../port/respository/order-repository';
import { Order } from '../model/order';

export class CreateOrderService {

  constructor(private readonly _orderRepository: OrderRespository) {}

  async createOrder(order: Order) {
    await this._orderRepository.save(order);
  }
}
