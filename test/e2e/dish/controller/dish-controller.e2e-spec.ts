import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';

import { DaoDish } from 'src/dominio/dish/port/dao/dao-dish';
import { DishRespository } from 'src/dominio/dish/port/respository/dish-repository';
import { DishController } from 'src/infraestructura/dish/controller/dish.controller';
import { createStubObj } from 'test/util/create-object.stub';
import { HandlerListDish } from 'src/aplicacion/dish/query/list-dish.handler';
import { HandlerCreateDish } from 'src/aplicacion/dish/command/create-dish.handler';
import { CreateDishService } from 'src/dominio/dish/service/create-dish.service';
import { serviceCreateDisheProvider } from 'src/infraestructura/dish/provider/service/create-dish.service';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { ComandoCreateDish } from 'src/aplicacion/dish/command/create-dish.command';
import { HandlerListDishById } from 'src/aplicacion/dish/query/list-dish-by-id.handler';
import { HandlerDishUpdate } from 'src/aplicacion/dish/command/update-dish.handler';
import { HandlerDishRemove } from 'src/aplicacion/dish/query/remove-dish.handler';
import { UpdateDishService } from 'src/dominio/dish/service/update-dish.service';
import { CommandUpdateDish } from 'src/aplicacion/dish/command/update-dish.command';
import { serviceUpdateDisheProvider } from 'src/infraestructura/dish/provider/service/update-dish.service';

const sinonSandbox = createSandbox();

describe('Controlador Dish', () => {
  let app: INestApplication;
  let dishRepository: SinonStubbedInstance<DishRespository>;
  let daoDish: SinonStubbedInstance<DaoDish>;
  let dishList;
  let dishById;
  let dishUpdate;
  let dishUpdateService: UpdateDishService;
  let handlerDishRemove;
  let dishController: DishController;
  const dishObjectList: any[] = [
    {
      title: 'Pescado',
      description: 'Pescado Frito',
      price: 25000,
      image: 'http://example.com',
      group: 1,
    },
  ];

  const dishOneObject = {
    id: 1,
    title: 'Pescado',
    description: 'Pescado Frito',
    price: 25000,
    image: 'http://example.com',
    group: 1,
  }


  beforeAll(async () => {
    dishRepository = createStubObj<DishRespository>(['save', 'update'], sinonSandbox);
    daoDish = createStubObj<DaoDish>(['toList', 'byId', 'remove'], sinonSandbox);

    const moduleRef = await Test.createTestingModule({
      controllers: [DishController],
      providers: [
        AppLogger,
        {
          provide: CreateDishService,
          inject: [DishRespository],
          useFactory: serviceCreateDisheProvider,
        },
        {
          provide: UpdateDishService,
          inject: [DishRespository],
          useFactory: serviceUpdateDisheProvider,
        },
        { provide: DishRespository, useValue: dishRepository },
        { provide: DaoDish, useValue: daoDish },
        HandlerListDish,
        HandlerCreateDish,
        HandlerListDishById,
        HandlerDishUpdate,
        HandlerDishRemove,
      ],
    }).compile();

    dishList = moduleRef.get<HandlerListDish>(HandlerListDish);
    dishById = moduleRef.get<HandlerListDishById>(HandlerListDishById);
    dishUpdate = moduleRef.get<HandlerDishUpdate>(HandlerDishUpdate);
    handlerDishRemove = moduleRef.get<HandlerDishRemove>(HandlerDishRemove);
    dishUpdateService = moduleRef.get<UpdateDishService>(UpdateDishService);
    dishController = moduleRef.get<DishController>(DishController);

    app = moduleRef.createNestApplication();
    const logger = await app.resolve(AppLogger);
    logger.customError = sinonSandbox.stub();
    app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
    await app.init();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('request toList', () => {
    it('deberia listar los platos', () => {
      daoDish.toList.returns(Promise.resolve(dishObjectList));

      return request(app.getHttpServer())
        .get('/dishes')
        .expect(HttpStatus.OK)
        .expect(dishObjectList);
    });
  });

  describe('get By Id', () => {
    it('deberia retornar un objeto por el ID', async () => {
      daoDish.byId.returns(Promise.resolve(dishOneObject));
      
      return request(app.getHttpServer())
        .get('/dishes/1')
        .expect(HttpStatus.OK)
        .expect(dishOneObject);
    });
  });

  describe('controller defined', () => {
    it('deberia ser verdadero que esta definido', () => {
      expect(dishController).toBeDefined();
    })
  })

  describe('getDishes controller', () => {
    it('should return orders list', async () => {
      jest
        .spyOn(dishList, 'getAll')
        .mockImplementation(() => dishObjectList);

      expect(await dishController.getDishes()).toBe(dishObjectList);
    });
  });

  describe('Post', () => {
    it('deberia retornar estatus 201 Created', async () => {
      const dish: ComandoCreateDish = {
        title: 'Lorem ipsum',
        description: 'Lorem ipsum',
        price: 25000,
        image: 'http://example.com',
        group: 1
      };

      return request(app.getHttpServer())
        .post('/dishes').send(dish)
        .expect(HttpStatus.CREATED);
    });
  });

  describe('getDishes controller', () => {
    it('should return orders list', async () => {
      jest
        .spyOn(dishById, 'getById')
        .mockImplementation(() => dishOneObject);

      expect(await dishController.getById(1)).toBe(dishOneObject);
    });
  });

  describe('getDishes controller', () => {
    it('should return orders list', async () => {
      jest
        .spyOn(dishUpdate, 'update')
        .mockImplementation(() => dishOneObject);

      expect(await dishController.update(1, dishOneObject)).toBe(dishOneObject);
    });
  });

  describe('handler controller', () => {
    it('should return orders list', async () => {
      jest
        .spyOn(handlerDishRemove, 'delete')
        .mockImplementation(() => dishOneObject);

      expect(await dishController.delete(1)).toBe(dishOneObject);
    });
  });

  describe('Put', () => {
    it('deberia retornar estatus 200 editado correctamente', async () => {
      const dish: CommandUpdateDish = {
        title: 'Lorem ipsum',
        description: 'Lorem ipsum',
        price: 25000,
        image: 'http://example.com',
        group: 1
      };

      return request(app.getHttpServer())
        .put('/dishes/1').send(dish)
        .expect(HttpStatus.OK);
    });
  });

  describe('Put test 2', () => {
    it('deberia retornar estatus 200 editado correctamente', async () => {
      const dish = {
        id: 1,
        title: 'Pescado',
        description: 'Pescado Frito',
        price: 25000,
        image: 'http://example.com',
        group: 1
      };

      return request(app.getHttpServer())
        .put('/dishes/1').send(dish)
        .expect(HttpStatus.OK)
        .expect(dish);
    });
  })

  describe('UpdateService defined', () => {
    it('deberia ser verdadero que esta definido', () => {
      expect(dishUpdateService).toBeDefined();
    });
  });

  describe('Delete', () => {
    it('deberia retornar estatus 200 eliminado correctamente', async () => {
      return request(app.getHttpServer())
        .delete('/dishes/1')
        .expect(HttpStatus.OK);
    });
  });

});
