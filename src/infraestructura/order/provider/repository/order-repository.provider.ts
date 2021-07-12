import { OrderRespository } from 'src/dominio/order/port/respository/order-repository';
import { OrderRepositoryDb } from '../../adapter/repository/order-repository-db';

export const OrderRespositoryProvider = {
  provide: OrderRespository,
  useClass: OrderRepositoryDb,
};
