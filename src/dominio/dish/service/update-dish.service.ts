import { DishRespository } from '../port/respository/dish-repository';
import { UpdateDishDto } from 'src/aplicacion/dish/query/dto/dish.dto';
export class UpdateDishService {

  constructor(private readonly _dishRepository: DishRespository) {}

  async update(id: number, changes: UpdateDishDto) {
    await this._dishRepository.update(id, changes);
  }
}
