
export interface AccountBalance {
  accountId: number;
  balance: number;
}

export interface Transaction{
  id: number,
  account_id: number,
  description: string,
  amount:number,
  type: string,
  created_at: string
}

export interface ConversionUSD{
  account_id: number,
  provider: string,
  conversion_type: string,
  from_currency: string,
  to_currency: string,
  original_balance: string,
  converted_balance: number,
  rate: number,
  date: string
}

export interface ConversionBTC{
  account_id: number,
  provider: string,
  conversion_type: string,
  from_currency: string,
  to_crypto: string,
  market_symbol: string,
  original_balance: string,
  price: number,
  converted_amount: number,
}
