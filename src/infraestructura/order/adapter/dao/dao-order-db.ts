import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { DaoOrder } from 'src/dominio/order/port/dao/dao-order';
import { OrderEntity } from '../../entity/order.entidad';

@Injectable()
export class DaoOrderDb implements DaoOrder {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repositorio: Repository<OrderEntity>,
  ) {}

  async toList(): Promise<OrderEntity[]> {
    return this.repositorio.find();
  }

  async byId(id: number): Promise<OrderEntity> {
    return this.repositorio.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repositorio.delete(id);
  }
}
