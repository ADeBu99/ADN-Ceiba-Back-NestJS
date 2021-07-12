import { Injectable } from '@nestjs/common';
import { CreateOrderService } from 'src/dominio/order/service/create-order.service';
import { Order } from 'src/dominio/order/model/order';
import { CommandCreateOrder } from './create-order.command';

@Injectable()
export class HandlerCreateOrder {
  constructor(private _createOrderService: CreateOrderService) {}

  async ejecutar(commandCreateOrder: CommandCreateOrder) {
    return this._createOrderService.createOrder(
      new Order(
        commandCreateOrder.amount,
        commandCreateOrder.price,
        commandCreateOrder.mesa,
        commandCreateOrder.dishId,
        commandCreateOrder.createdAt,
      ),
    );
  }
}
