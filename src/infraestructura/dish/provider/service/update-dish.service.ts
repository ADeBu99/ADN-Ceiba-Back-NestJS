import { DishRespository } from 'src/dominio/dish/port/respository/dish-repository';
import { UpdateDishService } from 'src/dominio/dish/service/update-dish.service'; 

export function serviceUpdateDisheProvider(dishRepository: DishRespository) {
  return new UpdateDishService(dishRepository);
}
