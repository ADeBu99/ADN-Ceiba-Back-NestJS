import { DishDto, UpdateDishDto } from 'src/aplicacion/dish/query/dto/dish.dto';
import { Dish } from '../../model/dish';

export abstract class DishRespository {
  abstract save(dish: Dish): Promise<DishDto>;
  abstract update(id: number, changes: UpdateDishDto);
}
