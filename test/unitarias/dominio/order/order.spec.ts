import { Order } from 'src/dominio/order/model/order';
import { DateError } from 'src/dominio/errores/date-error';

describe('Validando dias y horas de servicio', () => {
  const _Order = Order as any;
  const _date = new Date("Sun Jul 18 2021 11:25:27 GMT-0500");

  describe('Order', () => {
    it('No deberia dar ningún problema al obtener', () => {
      const order = new _Order(1, 25000, 4, 1, _date);

      expect(order.amount).toEqual(1);
      expect(order.price).toEqual(25000);
      expect(order.mesa).toEqual(4);
      expect(order.dishId).toEqual(1);
    });
  });

  describe('Order date error', () => {
    it('deberia dar error solo es valido sabados y domingos', () => {
      const _dateError = new Date("07/12/2021")
      return expect(async () => new _Order(1, 25000, 4, 1, _dateError))
        .rejects
        .toStrictEqual(new DateError('servicio disponible los Sabados y Domingos'));
    });
  });

  describe('Order hour error', () => {
    it('deberia dar error solo es valido entre 8A.M y 4P.M', () => {
      const _dateError = new Date("Sun Jul 18 2021 17:25:27 GMT-0500")
      return expect(async () => new _Order(1, 25000, 4, 1, _dateError))
        .rejects
        .toStrictEqual(new DateError('servicio disponible entre las 8A.M y 4P.M'));
    });
  });
});
