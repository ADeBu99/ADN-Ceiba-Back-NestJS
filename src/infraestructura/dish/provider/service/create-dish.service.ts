import { DishRespository } from 'src/dominio/dish/port/respository/dish-repository';
import { CreateDishService } from 'src/dominio/dish/service/create-dish.service';

export function serviceCreateDisheProvider(dishRepository: DishRespository) {
  return new CreateDishService(dishRepository);
}
