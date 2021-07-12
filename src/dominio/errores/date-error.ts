import { ErrorDeNegocio } from './error-de-negocio';

export class DateError extends ErrorDeNegocio {
  constructor(mensaje: string) {
    super(mensaje, DateError.name);
  }
}
