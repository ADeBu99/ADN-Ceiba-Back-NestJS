import { Module } from '@nestjs/common';
import { DishRespository } from 'src/dominio/dish/port/respository/dish-repository';
import { HandlerListDish } from 'src/aplicacion/dish/query/list-dish.handler';
import { DaoDish } from 'src/dominio/dish/port/dao/dao-dish';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishEntity } from '../entity/dish.entidad';
import { CreateDishService } from 'src/dominio/dish/service/create-dish.service';
import { serviceCreateDisheProvider } from './service/create-dish.service';
import { DishRespositoryProvider } from './repository/dish-repository.provider';
import { daoDishProvider } from './dao/dish-dao.provider';
import { HandlerCreateDish } from 'src/aplicacion/dish/command/create-dish.handler';
import { HandlerDishUpdate } from 'src/aplicacion/dish/command/update-dish.handler';
import { HandlerListDishById } from 'src/aplicacion/dish/query/list-dish-by-id.handler';
import { UpdateDishService } from 'src/dominio/dish/service/update-dish.service';
import { serviceUpdateDisheProvider } from './service/update-dish.service';
import { HandlerDishRemove } from 'src/aplicacion/dish/query/remove-dish.handler';

@Module({
  imports: [TypeOrmModule.forFeature([DishEntity])],
  providers: [
    { provide: CreateDishService, inject: [DishRespository], useFactory: serviceCreateDisheProvider },
    { provide: UpdateDishService, inject: [DishRespository], useFactory: serviceUpdateDisheProvider },
    DishRespositoryProvider,
    daoDishProvider,
    HandlerListDish,
    HandlerCreateDish,
    HandlerListDishById,
    HandlerDishUpdate,
    HandlerDishRemove,
  ],
  exports: [
    CreateDishService,
    HandlerCreateDish,
    HandlerListDish,
    HandlerListDishById,
    HandlerDishUpdate,
    HandlerDishRemove,
    DishRespository,
    UpdateDishService,
    DaoDish,
  ],
})
export class DishProviderModule {}
