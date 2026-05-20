import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bankservice } from '../../bankservice';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-saldo',
  imports: [CommonModule],
  templateUrl: './saldo.html',
  styleUrl: './saldo.css',
})
export class Saldo implements OnInit, OnDestroy {
  saldo: number = 0;
  private sub?: Subscription;

  constructor(private bankservice: Bankservice) {}

  ngOnInit(): void {
    this.sub = this.bankservice.saldo$.subscribe((value) => {
      this.saldo = value;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
