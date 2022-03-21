export interface Tx {
  contract: string,
  from: string,
  to: string,
  cost: number,
  hash: string,
  status?: 'error' | 'success',
  fn?: string
}
