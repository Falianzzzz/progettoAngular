import { Component, signal, effect } from '@angular/core';
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
  selectedFiat = signal<string>('USD');
  loading = signal<boolean>(false);
  conversionData = signal<any | null>(null);

  fiats: { symbol: string; name: string }[] = [
    { symbol: 'USD', name: 'Dollaro USA' },
    { symbol: 'GBP', name: 'Sterlina Britannica' },
    { symbol: 'CHF', name: 'Franco Svizzero' },
    { symbol: 'JPY', name: 'Yen Giapponese' },
  ];

  constructor(private bankService: Bankservice) {
    effect(() => {
      this.selectedFiat();
      this.conversionData.set(null);
      this.convert();
    });
  }

  convert() {
    this.loading.set(true);
    this.bankService.convertToFiat(1, this.selectedFiat()).subscribe({
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
