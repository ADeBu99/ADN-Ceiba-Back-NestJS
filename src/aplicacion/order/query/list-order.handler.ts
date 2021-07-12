import { Injectable } from '@nestjs/common';

import { DaoOrder } from 'src/dominio/order/port/dao/dao-order';
import { OrderEntity } from 'src/infraestructura/order/entity/order.entidad';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class HandlerListOrder {
  constructor(private _daoOrder: DaoOrder) {}

  async getAll(): Promise<OrderEntity[]> {
    return this._daoOrder.toList();
  }
}
