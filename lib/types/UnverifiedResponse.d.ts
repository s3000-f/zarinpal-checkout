import { UnverifiedItem } from './UnverifiedItem';
export type UnverifiedResponse = {
    code: string;
    message: string;
    authorities: UnverifiedItem[];
};
