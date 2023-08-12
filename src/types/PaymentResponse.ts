export type PaymentResponse = {
  code: number,
  message: string,
  authority: string,
  fee_type: string,
  fee: number,
  url: string,
}
