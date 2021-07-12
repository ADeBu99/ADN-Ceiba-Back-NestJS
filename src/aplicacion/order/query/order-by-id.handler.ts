import { Injectable } from '@nestjs/common';

import { DaoOrder } from 'src/dominio/order/port/dao/dao-order';
import { OrderDto } from 'src/aplicacion/order/query/dto/order.dto';
import { Order } from 'src/dominio/order/model/order';
import { OrderEntity } from 'src/infraestructura/order/entity/order.entidad';

@Injectable()
export class HandlerOrderById {
  constructor(private _daoOrder: DaoOrder) {}

  async getById(id: number): Promise<OrderEntity> {
    return this._daoOrder.byId(id);
  }
}
