import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import {
  OrderDto,
  } from '../../../aplicacion/order/query/dto/order.dto';

import { HandlerListOrder } from 'src/aplicacion/order/query/list-order.handler';
import { HandlerOrderById } from 'src/aplicacion/order/query/order-by-id.handler';
import { HandlerOrderRemove } from 'src/aplicacion/order/query/remove-order.handler';
import { HandlerCreateOrder } from 'src/aplicacion/order/command/create-order.handler';
import { OrderEntity } from '../entity/order.entidad';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly _handlerListOrder: HandlerListOrder,
    private readonly _handlerCreateOrder: HandlerCreateOrder,
    private readonly _handlerOrderById: HandlerOrderById,
    private readonly _handlerOrderRemove: HandlerOrderRemove
  ) {}

  @Post()
  async create(@Body() payload: OrderDto) {
    return this._handlerCreateOrder.ejecutar(payload);
  }

  @Get()
  @ApiOperation({ summary: 'List of dishes' })
  async getDishes(): Promise<OrderEntity[]> {
    return this._handlerListOrder.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<OrderEntity> {
    return this._handlerOrderById.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this._handlerOrderRemove.delete(id);
  }
}
