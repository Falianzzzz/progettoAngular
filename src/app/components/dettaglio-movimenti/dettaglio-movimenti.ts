import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bankservice } from '../../bankservice';
import { Movimento } from '../../movimento';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dettaglio-movimenti',
  imports: [CommonModule, RouterLink],
  templateUrl: './dettaglio-movimenti.html',
  styleUrl: './dettaglio-movimenti.css',
})
export class DettaglioMovimenti implements OnInit {
  movimento?: Movimento;

  constructor(
    private route: ActivatedRoute,
    private bankservice: Bankservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!isNaN(id)) {
      this.movimento = this.bankservice.getMovimentoById(id);

    }
  }

  back() {
    this.router.navigate(['/movimenti']);
  }
}
