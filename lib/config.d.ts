declare const config: {
    https: string;
    sandbox: string;
    merchantIDLength: number;
    API: {
        PAYMENT: string;
        VERIFICATION: string;
        UNVERIFIED: string;
    };
    PG: (sandbox: boolean) => "https://sandbox.zarinpal.com/pg/StartPay/" | "https://www.zarinpal.com/pg/StartPay/";
};
