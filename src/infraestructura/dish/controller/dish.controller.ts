import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import {
  DishDto,
  UpdateDishDto,
} from '../../../aplicacion/dish/query/dto/dish.dto';

import { HandlerListDish } from 'src/aplicacion/dish/query/list-dish.handler';
import { HandlerCreateDish } from 'src/aplicacion/dish/command/create-dish.handler';
import { HandlerListDishById } from 'src/aplicacion/dish/query/list-dish-by-id.handler';
import { HandlerDishUpdate } from 'src/aplicacion/dish/command/update-dish.handler';
import { HandlerDishRemove } from 'src/aplicacion/dish/query/remove-dish.handler';

@ApiTags('dishes')
@Controller('dishes')
export class DishController {
  constructor(
    private readonly _handlerListDish: HandlerListDish,
    private readonly _handlerCreateDish: HandlerCreateDish,
    private readonly _handlerDishById: HandlerListDishById,
    private readonly _handlerDishUpdate: HandlerDishUpdate,
    private readonly _handlerDishRemove: HandlerDishRemove
  ) {}

  @Post()
  async create(@Body() payload: DishDto) {
    await this._handlerCreateDish.ejecutar(payload);
  }

  @Get()
  @ApiOperation({ summary: 'List of dishes' })
  async getDishes(): Promise<DishDto[]> {
    return this._handlerListDish.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<DishDto> {
    return this._handlerDishById.getById(id);
  }
  
  @Put(':id')
  async update(@Param('id') id: number, @Body() payload: UpdateDishDto): Promise<void> {
    return this._handlerDishUpdate.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this._handlerDishRemove.delete(id);
  }
}
