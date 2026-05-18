import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Bankservice } from '../../bankservice';

@Component({
  selector: 'app-crypto',
  imports: [FormsModule, CommonModule],
  templateUrl: './crypto.html',
  styleUrl: './crypto.css',
})
export class Crypto {
  euroAmount: number = 0;
  selectedCrypto: string = 'BTC';
  result: number | null = null;

  rates: { [key: string]: number } = {
    'BTC': 0.000016,
    'ETH': 0.00045,
    'SOL': 0.0075,
  };

  constructor(private bankService: Bankservice) {}

  convert() {
    this.result = this.euroAmount * this.rates[this.selectedCrypto];
  }

  useCurrentBalance() {
    this.euroAmount = this.bankService.getConto();
    this.convert();
  }
}
