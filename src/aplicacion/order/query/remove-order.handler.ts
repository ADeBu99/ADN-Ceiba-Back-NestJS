import { Injectable } from '@nestjs/common';

import { DaoOrder } from 'src/dominio/order/port/dao/dao-order';

@Injectable()
export class HandlerOrderRemove {
  constructor(private _daoOrder: DaoOrder) {}

  async delete(id: number): Promise<void> {
    return this._daoOrder.remove(id);
  }
}