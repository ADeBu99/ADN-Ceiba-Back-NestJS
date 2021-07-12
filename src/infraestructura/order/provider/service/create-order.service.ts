import { OrderRespository } from 'src/dominio/order/port/respository/order-repository';
import { CreateOrderService } from 'src/dominio/order/service/create-order.service';

export function serviceCreateOrderProvider(orderRepository: OrderRespository) {
  return new CreateOrderService(orderRepository);
}
