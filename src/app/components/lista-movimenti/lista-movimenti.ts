import {  Transaction } from '../../model';
import { Component, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Bankservice } from '../../bankservice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-movimenti',
  templateUrl: './lista-movimenti.html',
  styleUrl: './lista-movimenti.css',
  imports: [CommonModule, RouterLink],
})
export class ListaMovimenti implements OnInit {

movimenti = signal<Transaction[]>([]);
  constructor(private bankservice: Bankservice) {}

 ngOnInit(): void {


  this.bankservice.getTransactions(1).subscribe({
    next: (data: any) => {
      this.movimenti.set(data);
    }
  });

}

}
