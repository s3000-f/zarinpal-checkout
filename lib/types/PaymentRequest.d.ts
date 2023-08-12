import { PaymentMetadata } from './PaymentMetadata';
export type PaymentRequest = {
    amount: number;
    callback_url?: string;
    description: string;
    currency?: 'IRR' | 'IRT';
    metadata: PaymentMetadata;
};
