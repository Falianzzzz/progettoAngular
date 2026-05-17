import { Bankservice } from './../../bankservice';
import { Component, Input, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prelievo',
  imports: [FormsModule],
  templateUrl: './prelievo.html',
  styleUrl: './prelievo.css',
})
export class Prelievo {
  amount: number = 0;
  descrizione: string = '';
  message: string = '';
  error: string = '';

  constructor(private bankservice: Bankservice) {}

  prelieva() {
    this.message = '';
    this.error = '';
    if (!this.amount || this.amount <= 0) {
      this.error = 'Inserisci un importo positivo.';
      return;
    }

    const saldo = this.bankservice.getConto();
    if (this.amount > saldo) {
      this.error = 'Fondi insufficienti.';
      return;
    }

    this.bankservice.prelievoConto(this.amount);
    this.message = `Prelievo di ${this.amount} eseguito.`;
    this.amount = 0;
    this.descrizione = '';
  }

}
