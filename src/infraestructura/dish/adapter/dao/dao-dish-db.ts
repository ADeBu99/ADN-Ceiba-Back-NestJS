import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { DaoDish } from 'src/dominio/dish/port/dao/dao-dish';
import { DishDto } from 'src/aplicacion/dish/query/dto/dish.dto';
import { DishEntity } from '../../entity/dish.entidad';

@Injectable()
export class DaoDishDb implements DaoDish {
  constructor(
    @InjectRepository(DishEntity)
    private readonly repositorio: Repository<DishEntity>,
  ) {}

  async toList(): Promise<DishDto[]> {
    return this.repositorio.find();
  }

  async byId(id: number): Promise<DishDto> {
    return this.repositorio.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repositorio.delete(id);
  }
}
