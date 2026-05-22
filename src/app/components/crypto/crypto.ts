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
rates: any;
useCurrentBalance() {
throw new Error('Method not implemented.');
}
  euroAmount: number = 0;
  selectedCrypto: string = '';
  result: number | null = null;

convert(){



}

  constructor(private bankService: Bankservice) {}

}
