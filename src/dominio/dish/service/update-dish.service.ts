import { DishRespository } from '../port/respository/dish-repository';
import { Dish } from '../model/dish';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';
import { NotFoundException } from '@nestjs/common';
import { UpdateDishDto } from 'src/aplicacion/dish/query/dto/dish.dto';

export class UpdateDishService {

  constructor(private readonly _dishRepository: DishRespository) {}

  async update(id: number, changes: UpdateDishDto) {
    await this._dishRepository.update(id, changes);
  }
}
