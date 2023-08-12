import {UnverifiedItem} from './UnverifiedItem';

export type UnverifiedResponse = {
  code: number,
  message: string,
  authorities: UnverifiedItem[],
}
