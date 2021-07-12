import { Injectable } from '@nestjs/common';

import { DaoDish } from 'src/dominio/dish/port/dao/dao-dish';

@Injectable()
export class HandlerDishRemove {
  constructor(private _daoDish: DaoDish) {}

  async delete(id: number): Promise<void> {
    return this._daoDish.remove(id);
  }
}