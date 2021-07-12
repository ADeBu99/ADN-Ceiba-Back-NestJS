import { OrderRespository } from 'src/dominio/order/port/respository/order-repository';
import { OrderEntity } from '../../entity/order.entidad';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Order } from 'src/dominio/order/model/order';
import { OrderDto } from 'src/aplicacion/order/query/dto/order.dto';

@Injectable()
export class OrderRepositoryDb implements OrderRespository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repositorio: Repository<OrderEntity>,
  ) {}

  async save(order: Order) {
    const newData = this.repositorio.create(order);
    return this.repositorio.save(newData);
  }
}
