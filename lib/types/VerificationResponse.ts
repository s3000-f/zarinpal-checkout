export type VerificationResponse = {
  code: number,
  message: string,
  card_hash: string,
  card_pan: string,
  ref_id: number,
  fee_type: string,
  fee: number,
  url: string,
}
