import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Bankservice } from '../../bankservice';
import { Movimento } from '../../movimento';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-movimenti',
  templateUrl: './lista-movimenti.html',
  styleUrl: './lista-movimenti.css',
  imports: [CommonModule, RouterLink],
})
export class ListaMovimenti implements OnInit, OnDestroy {
  movimenti: Movimento[] = [];
  private sub?: Subscription;

  constructor(private bankservice: Bankservice) {}

  ngOnInit(): void {
    this.sub = this.bankservice.getMovimenti().subscribe((movimenti) => {
      this.movimenti = movimenti;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
