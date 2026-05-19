import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Bankservice } from '../../bankservice';

@Component({
  selector: 'app-deposito',
  imports: [FormsModule],
  templateUrl: './deposito.html',
  styleUrl: './deposito.css',
})
export class Deposito {
  amount: number = 0;
  descrizione: string = '';
  message: string = '';
  error: string = '';

  constructor(private bankservice: Bankservice) {}

  deposita() {

    this.bankservice.depositaConto(this.amount,this.descrizione);
    this.amount = 0;
    this.descrizione = '';
  }

}
