import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Bankservice } from '../../bankservice';
import { Transaction } from '../../model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  balance = signal<number>(0);
  lastTransactions = signal<Transaction[]>([]);

  quickActions = [
    { label: 'Deposito', route: '/deposit', icon: '↓' },
    { label: 'Prelievo', route: '/prelievo', icon: '↑' },
    { label: 'Saldo', route: '/saldo', icon: '€' },
    { label: 'Movimenti', route: '/movimenti', icon: '≡' },
    { label: 'Converti Fiat', route: '/converti-fiat', icon: '$' },
    { label: 'Converti Crypto', route: '/converti-crypto', icon: '₿' },
  ];

  constructor(private bankService: Bankservice) {}

  ngOnInit() {
    this.bankService.getBalance(1).subscribe({
      next: (res: any) => this.balance.set(res?.balance ?? res),
    });

    this.bankService.getTransactions(1).subscribe({
      next: (res: any) => {
        const list = Array.isArray(res) ? res : [];
        this.lastTransactions.set(list.slice(-3).reverse());
      },
    });
  }
}
