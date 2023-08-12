import {
  InitParams,
  PaymentRequest,
  PaymentResponse,
  PaymentVerification,
  UnverifiedResponse,
  VerificationResponse
} from './types';
import axios, {Axios} from 'axios';

/**
 * zarinpal-checkout • Simple implementation of ZarinPal Node.js. so you can quickly start using API.
 * @author Soroush Fathi
 * @date . 12/08/2023
 */
const config = require('./config');

export class Zarinpal {
  private merchant: string;
  private callbackURL?: string;
  private sandbox: boolean;
  private axios: Axios;

  /**
   * Constructor for Zarinpal class.
   * @param {InitParams} params
   */
  Zarinpal(params: InitParams) {
    if (params.merchantId.length === config.merchantIDLength) {
      this.merchant = params.merchantId;
    } else {
      throw new Error('The MerchantID must be ' + config.merchantIDLength + ' Characters.')
    }
    this.sandbox = params.sandbox || false;

    this.axios = axios.create({
      baseURL: this.sandbox ? config.sandbox : config.https,
      timeout: 30000,
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json'
      }
    })
  }

  /**
   * Get Authority from ZarinPal
   * @param  {PaymentRequest} request
   * @returns Promise<PaymentResponse>
   */
  async requestPayment(request: PaymentRequest): Promise<PaymentResponse> {
    if (!request.callbackURL && !this.callbackURL) {
      throw new Error('No Callback URL Provided')
    }
    if (!request.callbackURL) {
      request.callbackURL = this.callbackURL
    }
    if (!request.currency) {
      request.currency = 'IRT'
    }
    const response = await this.axios.post(config.API.PAYMENT, {...request, merchant_id: this.merchant})
    if (response.status === 200 && response.data.data.code === 100) {

      return {
        ...response.data.data,
        url: config.PG(this.sandbox) + response.data.data.Authority,
      } as PaymentResponse
    } else {
      const errors = response.data?.errors
      if (errors) {
        throw new Error(errors)
      } else {
        throw new Error('There was an error requesting payment')
      }
    }
  }


  /**
   * Validate Payment from Authority.
   * @param  {PaymentVerification} request
   * @returns Promise<VerificationResponse>
   * @throws Error
   */
  async verifyPayment(request: PaymentVerification): Promise<VerificationResponse> {
    const response = await this.axios.post(config.API.VERIFICATION, {...request, merchant_id: this.merchant})
    if (response.status === 200 && response.data.data.code === 100) {

      return response.data.data as VerificationResponse
    } else {
      const errors = response.data?.errors
      if (errors) {
        throw new Error(errors)
      } else {
        throw new Error('There was an error requesting payment')
      }
    }
  }


  /**
   * Get Unverified Transactions
   * @returns Promise<UnverifiedResponse>
   * @throws Error
   */
  async unverifiedTransactions(): Promise<UnverifiedResponse> {
    const response = await this.axios.post(config.API.UNVERIFIED, {merchant_id: this.merchant})
    if (response.status === 200 && response.data.data.code === 100) {

      return response.data.data as UnverifiedResponse
    } else {
      const errors = response.data?.errors
      if (errors) {
        throw new Error(errors)
      } else {
        throw new Error('There was an error requesting payment')
      }
    }
  }


}


/**
 * Export version module.
 */
exports
  .version = require('../package.json').version;
