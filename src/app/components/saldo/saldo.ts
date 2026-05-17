import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bankservice } from '../../bankservice';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-saldo',
  imports: [RouterLink,CommonModule],
  templateUrl: './saldo.html',
  styleUrl: './saldo.css',
})
export class Saldo implements OnInit {
  saldo: number = 0;
  private sub?: Subscription;

  constructor(private bankservice: Bankservice) {}

  ngOnInit(): void {
    this.saldo = this.bankservice.getConto();
    this.sub = this.bankservice.saldo$.subscribe((s) => (this.saldo = s));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
