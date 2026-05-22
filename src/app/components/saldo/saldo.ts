import { Component, OnInit, OnDestroy, Signal, signal } from '@angular/core';
import { Bankservice } from '../../bankservice';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-saldo',
  imports: [CommonModule],
  templateUrl: './saldo.html',
  styleUrl: './saldo.css',
})
export class Saldo implements OnInit {
  saldo = signal(0);
  saldoData: { balance: number } = { balance: 0 };

  constructor(private bankservice: Bankservice) {}

 ngOnInit(): void {

  this.bankservice.getBalance(1).subscribe({

    next: (data) => {

      this.saldoData = data;

      console.log(this.saldoData.balance);
      this.saldo.set(this.saldoData.balance);
    }

  });

}
}
