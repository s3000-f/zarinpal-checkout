const config = {
	https: 'https://api.zarinpal.com/pg/v4/payment/',
	sandbox: 'https://sandbox.zarinpal.com/pg/v4/payment/',
	merchantIDLength: 36,
	API: {
		PAYMENT: 'request.json',
		VERIFICATION: 'verify.json',
		UNVERIFIED: 'unVerified.json'
	},
	PG: function(sandbox: boolean) {
		if (sandbox) {
			return 'https://sandbox.zarinpal.com/pg/StartPay/';
		}
		return 'https://www.zarinpal.com/pg/StartPay/';
	}
};

module.exports = config;
