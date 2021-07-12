import { OrderDto } from 'src/aplicacion/order/query/dto/order.dto';
import { OrderEntity } from 'src/infraestructura/order/entity/order.entidad';
import { Order } from '../../model/order';

export abstract class OrderRespository {
  abstract async save(order: Order);
}
