import { DishDto } from 'src/aplicacion/dish/query/dto/dish.dto';

export abstract class DaoDish {
  abstract toList(): Promise<DishDto[]>;
  abstract byId(id): Promise<DishDto>;
  abstract remove(id: number): Promise<void>;
}