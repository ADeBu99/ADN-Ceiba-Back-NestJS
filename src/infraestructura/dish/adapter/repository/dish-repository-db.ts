import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { DishRespository } from 'src/dominio/dish/port/respository/dish-repository';
import { Dish } from 'src/dominio/dish/model/dish';
import { DishEntity } from '../../entity/dish.entidad';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UpdateDishDto } from 'src/aplicacion/dish/query/dto/dish.dto';

@Injectable()
export class DishRepositoryDb implements DishRespository {
  constructor(
    @InjectRepository(DishEntity)
    private readonly repositorio: Repository<DishEntity>,
  ) {}

  async save(dish: Dish): Promise<DishEntity> {
    const newData = this.repositorio.create(dish);
    return await this.repositorio.save(newData);
  }

  async update(id: number, changes: UpdateDishDto): Promise<DishEntity> {
    const dish = await this.repositorio.findOne(id);
    this.repositorio.merge(dish, changes);
    return this.repositorio.save(dish);
  }
}
