import { Component, signal, effect } from '@angular/core';
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
  selectedCrypto = signal<string>('BTC');
  loading = signal<boolean>(false);
  conversionData = signal<any | null>(null);

  cryptos: { symbol: string; name: string }[] = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'SOL', name: 'Solana' },
  ];

  constructor(private bankService: Bankservice) {
    effect(() => {
      this.selectedCrypto();
      this.conversionData.set(null);
      this.convert();
    });
  }

  convert() {
    this.loading.set(true);
    this.bankService.convertToCrypto(1, this.selectedCrypto()).subscribe({
      next: (res: any) => {
        this.conversionData.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
