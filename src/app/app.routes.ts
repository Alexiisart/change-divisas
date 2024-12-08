import { Routes } from '@angular/router';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { LoanCalculatorComponent } from './loan-calculator/loan-calculator.component';

export const routes: Routes = [
  { path: '', component: LoanCalculatorComponent },
  { path: 'currency-converter', component: CurrencyConverterComponent },
];
