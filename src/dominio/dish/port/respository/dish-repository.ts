import { DishDto, UpdateDishDto } from 'src/aplicacion/dish/query/dto/dish.dto';
import { Dish } from '../../model/dish';

export abstract class DishRespository {
  abstract async save(dish: Dish): Promise<DishDto>;
  abstract async update(id: number, changes: UpdateDishDto);
}
