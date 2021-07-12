import { DaoOrder } from 'src/dominio/order/port/dao/dao-order';
import { DaoOrderDb } from '../../adapter/dao/dao-order-db'; 

export const daoOrderProvider = {
  provide: DaoOrder,
  useClass: DaoOrderDb,
};
