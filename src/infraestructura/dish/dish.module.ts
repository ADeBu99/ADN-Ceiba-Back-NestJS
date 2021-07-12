import { Module } from '@nestjs/common';
import { DishController } from './controller/dish.controller';
import { DishProviderModule } from './provider/dish-provider.module';

@Module({
  imports: [
    DishProviderModule
  ],
  controllers: [DishController],
})
export class DishModule {}
