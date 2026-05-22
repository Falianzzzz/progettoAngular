import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Bankservice } from './../../bankservice';

@Component({
  selector: 'app-deposito',
  imports: [CommonModule, FormsModule],
  templateUrl: './deposito.html',
  styleUrl: './deposito.css',
})
export class Deposito {
  amount = 0;
  description = '';
  message = '';

  constructor(private bankservice: Bankservice) {}

  deposita(): void {
    if (this.amount <= 0) {
      alert('Insert a valid import');
      return;
    }

    this.bankservice.doDeposit(1, this.amount, this.description).subscribe({
      next: () => {
        this.message = 'Deposito effettuato con successo';
        this.amount = 0;
        this.description = '';
      },
      error: () => {
        this.message = 'Errore durante il deposito';
      },
    });
  }
}
