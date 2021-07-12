import { DateError } from 'src/dominio/errores/date-error';

export class Order {
  readonly #amount: number;
  readonly #price: number;
  readonly #mesa: number;
  readonly #dishId: number;
  readonly #createdAt: Date;
  readonly now: Date = new Date();

  constructor(amount: number, price: number, mesa: number, dishId: number, createdAt: string) {
    this.#amount = amount;
    this.#price = price;
    this.#mesa = mesa;
    this.#dishId = dishId;
    this.#createdAt = new Date(createdAt);
    this.Weekend(new Date(createdAt));
    this.ValidateSunday(new Date(createdAt));
    this.Hours(new Date(createdAt));
  }
  
  private Weekend(date: Date) {
    const dayNum: number = new Date(date).getDay();
    if (dayNum == 0 || dayNum == 6) {
      return true;
    }
    else {
      throw new DateError(
        `servicio disponible los Sabados y Domingos`,
      );
    }
  }

  // 2021-07-12T15:47:52.023Z
  // Sun Jul 17 2021 17:25:27 GMT-0500 --> Date for Testing

  private ValidateSunday(date: Date) {
    const dayNum: number = new Date(date).getDay();
    if (dayNum == 0) {
      return true;
    }
  }

  private validateHour(time: Date) {
    const OPEN_HOUR = 8;
    const CLOSE_HOUR = 16;
  
    const now: Date = new Date();
  
    const open: Date = new Date(now);
    open.setHours(OPEN_HOUR);
  
    const close: Date = new Date(now);
    close.setHours(CLOSE_HOUR);
  
    const hour: number = new Date(time).getHours();
  
    const time1: Date = new Date(now);
    time1.setHours(hour);
  
    if (time1 >= open && time1 <= close) {
      return true;
    }
    throw new DateError(
      `servicio disponible entre las 8A.M y 4P.M`,
    );
  }

  private Hours(date: Date) {
    const validateH: boolean = this.validateHour(date);

    if (validateH) {
      return true;
    }
  }

  get amount(): number {
    return this.#amount;
  }

  get price(): number {
    return this.#price;
  }

  get mesa(): number {
    return this.#mesa;
  }

  get dishId(): number {
    return this.#dishId;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }
}
