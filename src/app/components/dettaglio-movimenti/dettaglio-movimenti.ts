import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bankservice } from '../../bankservice';
import { Transaction } from '../../model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dettaglio-movimenti',
  imports: [CommonModule],
  templateUrl: './dettaglio-movimenti.html',
  styleUrl: './dettaglio-movimenti.css',
})
export class DettaglioMovimenti implements OnInit{
  movimento = signal<Transaction | null>(null);
constructor(private route: ActivatedRoute, private bankservice: Bankservice, private router: Router) {}
back() {
    this.router.navigate(['/movimenti']);
}
ngOnInit() {

    const paramid = this.route.snapshot.paramMap.get('id');
  const id = paramid ? Number(paramid) : NaN;
    this.bankservice.getTransactionById(1, id).subscribe((data) => {
      this.movimento.set(data);
      console.log(this.movimento());
    });


}

}
