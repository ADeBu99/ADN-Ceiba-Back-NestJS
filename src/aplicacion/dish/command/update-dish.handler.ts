import { Injectable } from '@nestjs/common';
import { UpdateDishService } from 'src/dominio/dish/service/update-dish.service';
import { UpdateDishDto } from '../query/dto/dish.dto';

@Injectable()
export class HandlerDishUpdate {
  constructor(private _updateDishService: UpdateDishService) {}

  async update(id: number, dish: UpdateDishDto) {
    await this._updateDishService.update(id, dish);
  }
}
