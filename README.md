# Zarinpal Checkout V4

# Forked From: [Zarinpal Checkout](https://github.com/siamak/zarinpal-checkout)
* Easy to Use
* Promises/A+ Compatible
* Sandboxing

## 🕹 Usage
Install the package from `npm` or `yarn` and require it in your Node project:
```bash
npm install zarinpal-checkout-v4
# or
yarn add zarinpal-checkout-v4
```

```javascript
const Zarinpal = require('zarinpal-checkout-v4');
// or
import Zarinpal from 'zarinpal-checkout-v4';
```

Then create an instance:
### Sandbox is currently unavailable on Zarinpal's side
```javascript
/**
 * Create Zarinpal
 * callbackURL and Sandbox are both optional.
 * if callbackURL is not provided here, 
 * one must be provided upon requesting payment
 */
const initParams: InitParams = {
    merchantId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    callbackURL: 'https://your-domain/verify',
    sandbox: false,
  }
const zarinpal = Zarinpal.CreateInstance(initParams);
```

## 📢 API
### ★ Payment Request:
```javascript
/**
 * callback_url, currency, email, mobile and order_id are optional
 * if no callback_url given, the url defaults to one used with constructor
 * if no currency given, the currency defaults to IRT
 */
const request: PaymentRequest = {
  amount: 1000,
  callback_url: 'https://your-domain.com/verify',
  description: 'Test Payment',
  currency: 'IRT',
  metadata: {
    email: 'a@b.com',
    mobile: '09999999999',
    order_id: '1234',
  } as PaymentMetadata,
}
/**
 * requestPayment
 * @param {PaymentRequest} request
 * @returns Promise<PaymentResponse>
 */
const response = await zarinpal.requestPayment(request)
```

### ★ Payment Verification:
```javascript
const request: PaymentVerification = {
  amount: 1000,
  authority: '000000000000000000000000000000000000',
}
/**
 * Verify Payment from Authority.
 * @param  {PaymentVerification} request
 * @returns Promise<VerificationResponse>
 */
const response = await zarinpal.verifyPayment(request)
```
### ★ Unverified Transactions:
```javascript
/**
 * Get Unverified Transactions
 * @returns Promise<UnverifiedResponse>
 */
const response = await zarinpal.UnverifiedTransactions()
```
---

## 🔆 To-Do
- [ ] Add Extra mode for API.
- [ ] Unit testing `mocha`.

## 👋 Contribution
Contributions are welcome. Please submit PRs or just file an issue if you see something broken or in
need of improving.

## 🍀 License
This software is released under the [MIT License](http://siamak.mit-license.org).

```
The MIT License (MIT)

Copyright (c) 2023 Soroush Fathi soroushfathi3000@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
