import { DishDto } from 'src/aplicacion/dish/query/dto/dish.dto';

export abstract class DaoDish {
  abstract async toList(): Promise<DishDto[]>;
  abstract async byId(id): Promise<DishDto>;
  abstract async remove(id: number): Promise<void>;
}