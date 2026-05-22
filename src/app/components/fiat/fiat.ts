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
  selectedFiat: string = 'USD';
  result: number | null = null;

  rates: { [key: string]: number } = {
    'USD': 1.08,
    'GBP': 0.86,
    'CHF': 0.94,
    'JPY': 162.5,
  };

  constructor(private bankService: Bankservice) {}

  convert() {
    this.result = this.euroAmount * this.rates[this.selectedFiat];
  }

  useCurrentBalance() {
    this.bankService.getBalance(1).subscribe({
      next: (res: any) => {
        this.euroAmount = res?.balance ?? res;
        this.convert();
      },
    });
  }
}
