import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Bankservice } from '../../bankservice';
import { Movimento } from '../../movimento';

@Component({
  selector: 'app-lista-movimenti',
  templateUrl: './lista-movimenti.html',
  styleUrl: './lista-movimenti.css',
  imports: [CommonModule, RouterLink],
})
export class ListaMovimenti implements OnInit {
  movimenti: Movimento[] = [];

  constructor(private bankservice: Bankservice) {}

  ngOnInit(): void {
    this.movimenti = this.bankservice.getMovimenti();
  }

  aggingiMovimento(movimento: Movimento) {
    this.bankservice.addMovimento(movimento);
  }
}

