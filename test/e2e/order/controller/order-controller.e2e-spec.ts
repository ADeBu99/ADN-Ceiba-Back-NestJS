import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from 'test/util/create-object.stub';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';

import { DaoOrder } from 'src/dominio/order/port/dao/dao-order';
import { OrderRespository } from 'src/dominio/order/port/respository/order-repository';
import { OrderController } from 'src/infraestructura/order/controller/order.controller';
import { HandlerListOrder } from 'src/aplicacion/order/query/list-order.handler';
import { HandlerCreateOrder } from 'src/aplicacion/order/command/create-order.handler';
import { CreateOrderService } from 'src/dominio/order/service/create-order.service';
import { serviceCreateOrderProvider } from 'src/infraestructura/order/provider/service/create-order.service';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { CommandCreateOrder } from 'src/aplicacion/order/command/create-order.command';
import { HandlerOrderById } from 'src/aplicacion/order/query/order-by-id.handler';
import { HandlerOrderRemove } from 'src/aplicacion/order/query/remove-order.handler';

const sinonSandbox = createSandbox();

describe('Controlador Dish', () => {
  let app: INestApplication;
  let orderRepository: SinonStubbedInstance<OrderRespository>;
  let daoOrder: SinonStubbedInstance<DaoOrder>;
  let orderList;
  let orderById;
  let handlerOrderRemove;
  let orderController: OrderController;
  const orderObjectList: any[] = [
    {
      amount: 2,
      price: 50000,
      mesa: 2,
    },
  ];

  const orderOneObject = {
    id: 1,
    amount: 2,
    price: 50000,
    mesa: 2,
  }


  beforeAll(async () => {
    orderRepository = createStubObj<OrderRespository>(['save'], sinonSandbox);
    daoOrder = createStubObj<DaoOrder>(['toList', 'byId', 'remove'], sinonSandbox);

    const moduleRef = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        AppLogger,
        {
          provide: CreateOrderService,
          inject: [OrderRespository],
          useFactory: serviceCreateOrderProvider,
        },
        { provide: OrderRespository, useValue: orderRepository },
        { provide: DaoOrder, useValue: daoOrder },
        HandlerListOrder,
        HandlerCreateOrder,
        HandlerOrderById,
        HandlerOrderRemove,
      ],
    }).compile();

    orderList = moduleRef.get<HandlerListOrder>(HandlerListOrder);
    orderById = moduleRef.get<HandlerOrderById>(HandlerOrderById);
    handlerOrderRemove = moduleRef.get<HandlerOrderRemove>(HandlerOrderRemove);
    orderController = moduleRef.get<OrderController>(OrderController);

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
      daoOrder.toList.returns(Promise.resolve(orderObjectList));

      return request(app.getHttpServer())
        .get('/orders')
        .expect(HttpStatus.OK)
        .expect(orderObjectList);
    });
  });

  describe('controller defined', () => {
    it('deberia ser verdadero que esta definido', () => {
      expect(orderController).toBeDefined();
    })
  })

  describe('getDishes controller', () => {
    it('should return orders list', async () => {
      jest
        .spyOn(orderList, 'getAll')
        .mockImplementation(() => orderObjectList);

      expect(await orderController.getDishes()).toBe(orderObjectList);
    });
  });

  describe('Post', () => {
    it('deberia retornar estatus 201 Created', async () => {
      const order: CommandCreateOrder = {
        amount: 2,
        price: 50000,
        mesa: 2,
        dishId: 1,
        createdAt: "Mon Jul 18 2021 11:25:27 GMT-0500"
      };

      return request(app.getHttpServer())
        .post('/orders').send(order)
        .expect(HttpStatus.CREATED);
    });
  });

  describe('getDishes controller', () => {
    it('should return orders list', async () => {
      jest
        .spyOn(orderById, 'getById')
        .mockImplementation(() => orderOneObject);

      expect(await orderController.getById(1)).toBe(orderOneObject);
    });
  });

  describe('handler controller', () => {
    it('should return orders list', async () => {
      jest
        .spyOn(handlerOrderRemove, 'delete')
        .mockImplementation(() => orderOneObject);

      expect(await orderController.delete(1)).toBe(orderOneObject);
    });
  });

  describe('Delete', () => {
    it('deberia retornar estatus 200 eliminado correctamente', async () => {
      return request(app.getHttpServer())
        .delete('/orders/1')
        .expect(HttpStatus.OK);
    });
  });

});
