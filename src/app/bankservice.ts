import { Injectable } from '@angular/core';
import { Movimento } from './movimento';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class Bankservice {
  private saldoSubject: BehaviorSubject<number>;
  saldo$: Observable<number>;

  constructor() {
    this.saldoSubject = new BehaviorSubject<number>(0);
    this.saldo$ = this.saldoSubject.asObservable();
    this.saldoSubject.next(this.getConto());
  }

  getConto() {
    let totale = 0;
    for (const m of this.movimenti) {
      const tipo = (m.tipo || '').toString().toLowerCase();
      const isPrelievo = tipo.includes('Prelievo') || tipo.includes('Deposito');
      if(isPrelievo)  totale -= m.importo;
       else totale += m.importo;
    }
    return totale;
  }

  depositaConto(dep: number,desrizione: string) {
    this.createMovimento('Deposito', dep, desrizione);
  }

  prelievoConto(dep: number,desrizione: string) {
    this.createMovimento('Prelievo', dep, desrizione);
  }


movimenti : Movimento[] = [
{id: 0,
data: new Date(),
tipo: 'Deposito',
importo: 1000,
descrizione: 'Versamento in conto' },
{id: 1,
data: new Date(),
tipo: 'Prelievo',
importo: 200,
descrizione: 'Prelievo bancomat' },
];

 getMovimenti() {

return this.movimenti;

}

  getMovimentoById(id: number) {
    return this.movimenti.find(m => m.id === id);
  }

  createMovimento(tipo: string, importo: number, descrizione: string) {
    const nextId = this.movimenti.length;
    const movimento: Movimento = {
      id: nextId,
      data: new Date(),
      tipo,
      importo,
      descrizione,
    };
    this.movimenti.push(movimento);
    this.saldoSubject.next(this.getConto());
  }

addMovimento(movimento: Movimento) {

  this.movimenti.push(movimento);
  this.saldoSubject.next(this.getConto());
}

}
