import { Injectable } from '@nestjs/common';

import { DaoDish } from 'src/dominio/dish/port/dao/dao-dish';
import { DishDto } from 'src/aplicacion/dish/query/dto/dish.dto'

@Injectable()
export class HandlerListDish {
  constructor(private _daoDish: DaoDish) {}

  async getAll(): Promise<DishDto[]> {
    return this._daoDish.toList();
  }
}
