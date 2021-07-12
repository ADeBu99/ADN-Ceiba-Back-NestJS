import { DaoDish } from 'src/dominio/dish/port/dao/dao-dish'; 
import { DaoDishDb } from '../../adapter/dao/dao-dish-db'; 

export const daoDishProvider = {
  provide: DaoDish,
  useClass: DaoDishDb,
};
