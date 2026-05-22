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
  constructor(private bankservice: Bankservice) {}

preleva() {
  if (this.amount <= 0) {
      alert('Insert a valid import');
      return;
    }

    this.bankservice.doWithdrawals(1, this.amount, this.description).subscribe({
      next: () => {
        this.message = 'Prelievo effettuato con successo';
        this.amount = 0;
        this.description = '';
      },
      error: () => {
        this.message = 'Errore durante il prelievo';
      },
    });
  }
          message = 'Prelievo effettuato con successo';
        amount = 0;
        description = '';
}



