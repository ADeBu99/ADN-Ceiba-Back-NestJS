import { PartialType } from '@nestjs/swagger';
import { DishDto } from '../query/dto/dish.dto';

export class CommandUpdateDish extends PartialType(DishDto) {}
