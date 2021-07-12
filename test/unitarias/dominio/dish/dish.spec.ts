import { Test, TestingModule } from '@nestjs/testing';
import { Dish } from 'src/dominio/dish/model/dish';

import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

describe('infraestructure', () => {
  let module: TestingModule;
  let _error;
  let _appLogger;


  const mockService = {
    customError: () => {},
  }

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [{provide: AppLogger, useValue: mockService}, ErrorDeNegocio],
      exports: [ErrorDeNegocio]
    }).compile();

    _appLogger = module.get<AppLogger>(AppLogger);
    _error = module.get<ErrorDeNegocio>(ErrorDeNegocio);
  });
  describe('AppLogger', () => {  
      it('deberia estar declarada', () => {
      expect(_appLogger).toBeDefined();
    })
  })
})

describe('Dish', () => {
  const _Dish = Dish as any;

  it('No debeia dar ningún problema al guardar', () => {
    const dish = new _Dish('Pescado', 'Pescado Frito', 25000, 'http://example.com', 1);

    expect(dish.title).toEqual('Pescado');
    expect(dish.description).toEqual('Pescado Frito');
    expect(dish.price).toEqual(25000);
    expect(dish.image).toEqual('http://example.com');
    expect(dish.group).toEqual(1);
  });
});
