import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Bankservice } from '../../bankservice';

@Component({
  selector: 'app-deposito',
  imports: [CommonModule, FormsModule],
  templateUrl: './deposito.html',
  styleUrl: './deposito.css',
})
export class Deposito {
  amount: number = 0;
  descrizione: string = '';
  message: string = '';
  error: string = '';
  isLoading = false;

  constructor(private bankservice: Bankservice) {}

  deposita() {
    this.message = '';
    this.error = '';

    if (!this.amount || this.amount <= 0) {
      this.error = 'Inserisci un importo valido.';
      return;
    }

    this.isLoading = true;
    this.bankservice.depositaConto(this.amount, this.descrizione).subscribe({
      next: () => {
        this.message = 'Deposito effettuato con successo.';
        this.amount = 0;
        this.descrizione = '';
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Errore durante il deposito. Riprova.';
        this.isLoading = false;
      },
    });
  }
}
