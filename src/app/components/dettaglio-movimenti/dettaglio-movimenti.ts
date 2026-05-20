import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bankservice } from '../../bankservice';
import { Movimento } from '../../movimento';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dettaglio-movimenti',
  imports: [CommonModule],
  templateUrl: './dettaglio-movimenti.html',
  styleUrl: './dettaglio-movimenti.css',
})
export class DettaglioMovimenti implements OnInit, OnDestroy {
  movimento?: Movimento;
  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private bankservice: Bankservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!isNaN(id)) {
      this.sub = this.bankservice.getMovimentoById(id).subscribe((movimento) => {
        this.movimento = movimento;
      });
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  back() {
    this.router.navigate(['/movimenti']);
  }
}
