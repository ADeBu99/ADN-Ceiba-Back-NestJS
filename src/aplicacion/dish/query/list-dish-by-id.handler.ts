import { Injectable } from '@nestjs/common';

import { DaoDish } from 'src/dominio/dish/port/dao/dao-dish';
import { DishDto } from 'src/aplicacion/dish/query/dto/dish.dto'

@Injectable()
export class HandlerListDishById {
  constructor(private _daoDish: DaoDish) {}

  async getById(id: number): Promise<DishDto> {
    return this._daoDish.byId(id);
  }
}
