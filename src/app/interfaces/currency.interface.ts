export interface CurrencyResponse {
  result: string;
  conversion_rates: { [key: string]: number };
}

export interface CacheData {
  rates: { [key: string]: number };
  timestamp: number;
}
