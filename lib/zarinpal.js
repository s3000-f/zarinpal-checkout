"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zarinpal = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * zarinpal-checkout • Simple implementation of ZarinPal Node.js. so you can quickly start using API.
 * @author Soroush Fathi
 * @date . 12/08/2023
 */
const config = require('./config');
class Zarinpal {
    merchant;
    callbackURL;
    sandbox;
    axios;
    static CreateInstance(params) {
        if (params.merchantId.length !== config.merchantIDLength) {
            throw new Error('The MerchantID must be ' + config.merchantIDLength + ' Characters.');
        }
        return new Zarinpal(params);
    }
    /**
     * Constructor for Zarinpal class.
     * @param {InitParams} params
     */
    constructor(params) {
        this.merchant = params.merchantId;
        this.callbackURL = params.callbackURL;
        this.sandbox = params.sandbox || false;
        this.axios = axios_1.default.create({
            baseURL: this.sandbox ? config.sandbox : config.https,
            timeout: 30000,
            headers: {
                'cache-control': 'no-cache',
                'content-type': 'application/json'
            }
        });
    }
    /**
     * Get Authority from ZarinPal
     * @param  {PaymentRequest} request
     * @returns Promise<PaymentResponse>
     */
    async requestPayment(request) {
        if (!request.callback_url && !this.callbackURL) {
            throw new Error('No Callback URL Provided');
        }
        if (!request.callback_url) {
            request.callback_url = this.callbackURL;
        }
        if (!request.currency) {
            request.currency = 'IRT';
        }
        const response = await this.axios.post(config.API.PAYMENT, { ...request, merchant_id: this.merchant }).catch(err => {
            const errors = err.response?.data?.errors;
            if (errors)
                throw new Error(JSON.stringify(errors));
            else
                throw err;
        });
        if (response.status === 200 && response.data.data.code === 100) {
            console.log(response.data, response.data.data, response.data.data.authority);
            return {
                ...response.data.data,
                url: config.PG(this.sandbox) + response.data.data.authority,
            };
        }
        else {
            if (response && response.data && response.data.errors) {
                throw new Error(JSON.stringify(response.data.errors));
            }
            else if (response && response.data && response.data.data) {
                throw new Error(JSON.stringify(response.data.data));
            }
            else {
                throw new Error('Unknown Error Occurred');
            }
        }
    }
    /**
     * Validate Payment from Authority.
     * @param  {PaymentVerification} request
     * @returns Promise<VerificationResponse>
     * @throws Error
     */
    async verifyPayment(request) {
        const response = await this.axios.post(config.API.VERIFICATION, { ...request, merchant_id: this.merchant }).catch(err => {
            const errors = err.response?.data?.errors;
            if (errors)
                throw new Error(JSON.stringify(errors));
            else
                throw err;
        });
        if (response.status === 200 && response.data.data.code >= 100) {
            return response.data.data;
        }
        else {
            if (response && response.data && response.data.errors) {
                throw new Error(JSON.stringify(response.data.errors));
            }
            else if (response && response.data && response.data.data) {
                throw new Error(JSON.stringify(response.data.data));
            }
            else {
                throw new Error('Unknown Error Occurred');
            }
        }
    }
    /**
     * Get Unverified Transactions
     * @returns Promise<UnverifiedResponse>
     * @throws Error
     */
    async unverifiedTransactions() {
        const response = await this.axios.post(config.API.UNVERIFIED, { merchant_id: this.merchant });
        if (response.status === 200 && response.data.data.code === '100') {
            return response.data.data;
        }
        else {
            const errors = response.data?.errors;
            if (errors) {
                throw new Error(errors);
            }
            else {
                throw new Error('There was an error requesting payment');
            }
        }
    }
}
exports.Zarinpal = Zarinpal;
/**
 * Export version module.
 */
exports
    .version = require('../package.json').version;
