import { InitParams, PaymentRequest, PaymentResponse, PaymentVerification, UnverifiedResponse, VerificationResponse } from './types';
export declare class Zarinpal {
    private merchant;
    private callbackURL?;
    private sandbox;
    private axios;
    static CreateInstance(params: InitParams): Zarinpal;
    /**
     * Constructor for Zarinpal class.
     * @param {InitParams} params
     */
    constructor(params: InitParams);
    /**
     * Get Authority from ZarinPal
     * @param  {PaymentRequest} request
     * @returns Promise<PaymentResponse>
     */
    requestPayment(request: PaymentRequest): Promise<PaymentResponse>;
    /**
     * Validate Payment from Authority.
     * @param  {PaymentVerification} request
     * @returns Promise<VerificationResponse>
     * @throws Error
     */
    verifyPayment(request: PaymentVerification): Promise<VerificationResponse>;
    /**
     * Get Unverified Transactions
     * @returns Promise<UnverifiedResponse>
     * @throws Error
     */
    unverifiedTransactions(): Promise<UnverifiedResponse>;
}
