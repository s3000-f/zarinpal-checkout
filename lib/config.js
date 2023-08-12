"use strict";
const config = {
    https: 'https://api.zarinpal.com/pg/v4/payment/',
    sandbox: 'https://api.zarinpal.com/pg/v4/payment/',
    merchantIDLength: 36,
    API: {
        PAYMENT: 'payment.json',
        VERIFICATION: 'verify.json',
        UNVERIFIED: 'unVerified.json'
    },
    PG: function (sandbox) {
        if (sandbox) {
            return 'https://sandbox.zarinpal.com/pg/StartPay/';
        }
        return 'https://www.zarinpal.com/pg/StartPay/';
    }
};
module.exports = config;
