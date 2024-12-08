import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from '../services/currency.service';
import { RouterModule } from '@angular/router';
import { NumberFormatDirective } from '../directives/number-format.directive';
@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NumberFormatDirective],
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
})
export class CurrencyConverterComponent implements OnInit {
  amount: string = '';
  fromCurrency: string = 'DOP';
  toCurrency: string = 'USD';
  result: number = 0;
  rates: { [key: string]: number } = {};
  currencies: string[] = [];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.loadRates();
  }

  loadRates() {
    this.currencyService.getLatestRates().subscribe({
      next: (rates: { [key: string]: number }) => {
        this.rates = rates;
        this.currencies = Object.keys(rates);
      },
      error: (error) => {
        console.error('Error fetching rates:', error);
      },
    });
  }

  calculate() {
    if (this.rates && this.amount) {
      const amountInUSD = Number(this.amount) / this.rates[this.fromCurrency];
      this.result = amountInUSD * this.rates[this.toCurrency];
    }
  }

  clear() {
    this.amount = '';
    this.result = 0;
  }
}
