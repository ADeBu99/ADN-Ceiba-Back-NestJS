import { DishRespository } from '../port/respository/dish-repository';
import { Dish } from '../model/dish';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class CreateDishService {

  constructor(private readonly _dishRepository: DishRespository) {}

  async createDish(dish: Dish) {
    await this._dishRepository.save(dish);
  }
}
