import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../entity/order.entidad';
import { serviceCreateOrderProvider } from './service/create-order.service';
import { OrderRespositoryProvider } from './repository/order-repository.provider';
import { daoOrderProvider } from './dao/order-dao.provider';
import { OrderRespository } from 'src/dominio/order/port/respository/order-repository';
import { CreateOrderService } from 'src/dominio/order/service/create-order.service';
import { HandlerListOrder } from 'src/aplicacion/order/query/list-order.handler';
import { HandlerCreateOrder } from 'src/aplicacion/order/command/create-order.handler';
import { HandlerOrderById } from 'src/aplicacion/order/query/order-by-id.handler';
import { HandlerOrderRemove } from 'src/aplicacion/order/query/remove-order.handler';
import { DaoOrder } from 'src/dominio/order/port/dao/dao-order';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  providers: [
    { provide: CreateOrderService, inject: [OrderRespository], useFactory: serviceCreateOrderProvider },
    OrderRespositoryProvider,
    daoOrderProvider,
    HandlerListOrder,
    HandlerCreateOrder,
    HandlerOrderById,
    HandlerOrderRemove,
  ],
  exports: [
    CreateOrderService,    
    HandlerListOrder,
    HandlerCreateOrder,
    HandlerOrderById,
    HandlerOrderRemove,
    OrderRespository,
    DaoOrder,
  ],
})
export class OrderProviderModule {}
