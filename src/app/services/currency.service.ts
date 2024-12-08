import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, catchError } from 'rxjs';
import { CurrencyResponse, CacheData } from '../interfaces/currency.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiKey = '3f08b81b40fd0ad7c94d7ae9/latest/USD';
  private baseUrl = 'https://v6.exchangerate-api.com/v6/';
  private cache: CacheData | null = null;
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  constructor(private http: HttpClient) {
    // Try to load cached data from localStorage on service initialization
    const savedCache = localStorage.getItem('currencyCache');
    if (savedCache) {
      this.cache = JSON.parse(savedCache);
    }
  }

  getLatestRates(): Observable<{ [key: string]: number }> {
    // Check if we have valid cached data (less than 24 hours old)
    if (this.cache && Date.now() - this.cache.timestamp < this.CACHE_DURATION) {
      return of(this.cache.rates);
    }

    return this.http
      .get<CurrencyResponse>(`${this.baseUrl}${this.apiKey}`)
      .pipe(
        map((response) => {
          this.cache = {
            rates: response.conversion_rates,
            timestamp: Date.now(),
          };
          localStorage.setItem('currencyCache', JSON.stringify(this.cache));
          return response.conversion_rates;
        }),
        catchError((error) => {
          console.error('Error fetching currency rates:', error);
          if (error.status === 500) {
            window.alert(
              'Existe un problema con el servidor, intente mas tarde'
            );
          }
          return of({}); // Return an empty object or handle the error as needed
        })
      );
  }
}
