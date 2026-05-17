import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Bankservice } from '../../bankservice';

@Component({
  selector: 'app-deposito',
  imports: [FormsModule],
  templateUrl: './deposito.html',
  styleUrl: './deposito.css',
})
export class Deposito {
  amount: number = 0;
  descrizione: string = '';
  message: string = '';
  error: string = '';

  constructor(private bankservice: Bankservice) {}

  deposita() {
    this.message = '';
    this.error = '';
    if (!this.amount || this.amount <= 0) {
      this.error = 'Inserisci un importo positivo.';
      return;
    }

    this.bankservice.depositaConto(this.amount);
    this.message = `Deposito di ${this.amount} eseguito.`;
    this.amount = 0;
    this.descrizione = '';
  }

}
