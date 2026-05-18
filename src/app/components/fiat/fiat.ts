import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Bankservice } from '../../bankservice';

@Component({
  selector: 'app-fiat',
  imports: [FormsModule, CommonModule],
  templateUrl: './fiat.html',
  styleUrl: './fiat.css',
})
export class Fiat {
  euroAmount: number = 0;
  selectedCurrency: string = 'USD';
  result: number | null = null;

  rates: { [key: string]: number } = {
    'USD': 1.08,
    'GBP': 0.85,
    'JPY': 163.50,
  };

  constructor(private bankService: Bankservice) {}

  convert() {
    this.result = this.euroAmount * this.rates[this.selectedCurrency];
  }

  useCurrentBalance() {
    this.euroAmount = this.bankService.getConto();
    this.convert();
  }
}
