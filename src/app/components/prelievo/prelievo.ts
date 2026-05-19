import { Bankservice } from './../../bankservice';
import { Component, Input, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prelievo',
  imports: [FormsModule],
  templateUrl: './prelievo.html',
  styleUrl: './prelievo.css',
})
export class Prelievo {
  amount: number = 0;
  descrizione: string = '';

  constructor(private bankservice: Bankservice) {}

  prelieva() {

    this.bankservice.prelievoConto(this.amount,this.descrizione);
    this.amount = 0;
    this.descrizione = '';
  }

}
