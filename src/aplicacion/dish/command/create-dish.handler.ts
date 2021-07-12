import { Injectable } from '@nestjs/common';
import { CreateDishService } from 'src/dominio/dish/service/create-dish.service';
import { Dish } from 'src/dominio/dish/model/dish';
import { ComandoCreateDish } from './create-dish.command';

@Injectable()
export class HandlerCreateDish {
  constructor(private _createDishService: CreateDishService) {}

  async ejecutar(comandoCreateDish: ComandoCreateDish) {
    await this._createDishService.createDish(
      new Dish(
        comandoCreateDish.title,
        comandoCreateDish.description,
        comandoCreateDish.price,
        comandoCreateDish.image,
        comandoCreateDish.group,
      ),
    );
  }
}
