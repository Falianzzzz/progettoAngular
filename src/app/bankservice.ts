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
    return this.movimenti.reduce((acc, m) => {
      const tipo = (m.tipo || '').toString().toLowerCase();
      const isPrelievo = tipo.includes('preliev') || tipo.includes('withdraw');
      return acc + (isPrelievo ? -m.importo : m.importo);
    }, 0);
  }

  depositaConto(dep: number) {
    this.createMovimento('Deposito', dep, 'Deposito');
  }

  prelievoConto(dep: number) {
    this.createMovimento('Prelievo', dep, 'Prelievo');
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
    const nextId = this.movimenti.length ? Math.max(...this.movimenti.map(m => m.id)) + 1 : 0;
    const movimento: Movimento = {
      id: nextId,
      data: new Date(),
      tipo,
      importo,
      descrizione,
    };
    this.movimenti.push(movimento);
    this.saldoSubject.next(this.getConto());
    return movimento;
  }

addMovimento(movimento: Movimento) {

  this.movimenti.push(movimento);
  this.saldoSubject.next(this.getConto());
}

}
