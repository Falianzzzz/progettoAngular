import { Bankservice } from './../../bankservice';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prelievo',
  imports: [CommonModule, FormsModule],
  templateUrl: './prelievo.html',
  styleUrl: './prelievo.css',
})
export class Prelievo {
  amount: number = 0;
  descrizione: string = '';
  message: string = '';
  error: string = '';
  isLoading = false;

  constructor(private bankservice: Bankservice) {}

  prelieva() {
    this.message = '';
    this.error = '';

    if (!this.amount || this.amount <= 0) {
      this.error = 'Inserisci un importo valido.';
      return;
    }

    this.isLoading = true;
    this.bankservice.prelievoConto(this.amount, this.descrizione).subscribe({
      next: () => {
        this.message = 'Prelievo effettuato con successo.';
        this.amount = 0;
        this.descrizione = '';
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Errore durante il prelievo. Riprova.';
        this.isLoading = false;
      },
    });
  }
}
