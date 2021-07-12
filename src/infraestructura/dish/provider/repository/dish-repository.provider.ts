import { DishRespository } from 'src/dominio/dish/port/respository/dish-repository';
import { DishRepositoryDb } from '../../adapter/repository/dish-repository-db';

export const DishRespositoryProvider = {
  provide: DishRespository,
  useClass: DishRepositoryDb,
};
