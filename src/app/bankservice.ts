import { Injectable } from '@angular/core';
import { Movimento } from './movimento';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Bankservice {
  private readonly apiUrl = 'https://bankingapi-production-2687.up.railway.app';
  private readonly accountId = 1;

  movimenti: Movimento[] = [
    {
      id: 0,
      data: new Date(),
      tipo: 'Deposito',
      importo: 1000,
      descrizione: 'Versamento in conto',
    },
    {
      id: 1,
      data: new Date(),
      tipo: 'Prelievo',
      importo: 200,
      descrizione: 'Prelievo bancomat',
    },
  ];

  private saldoSubject = new BehaviorSubject<number>(this.calculateLocalSaldo());
  saldo$: Observable<number> = this.saldoSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadRemoteSaldo();
  }

  private calculateLocalSaldo(): number {
    let totale = 0;
    for (const m of this.movimenti) {
      const tipo = (m.tipo || '').toString().toLowerCase();
      const isPrelievo = tipo.includes('prelievo');
      const isDeposito = tipo.includes('deposito');
      if (isPrelievo) {
        totale -= m.importo;
      } else if (isDeposito) {
        totale += m.importo;
      }
    }
    return totale;
  }

  private loadRemoteSaldo() {
    this.http
      .get<{ balance: number }>(`${this.apiUrl}/accounts/${this.accountId}/balance`)
      .pipe(
        map((result) => result.balance),
        catchError(() => of(this.calculateLocalSaldo()))
      )
      .subscribe((balance) => this.saldoSubject.next(balance));
  }

  private refreshSaldo() {
    this.loadRemoteSaldo();
  }

  getConto(): number {
    return this.saldoSubject.value;
  }

  getBalance(): Observable<number> {
    return this.http
      .get<{ balance: number }>(`${this.apiUrl}/accounts/${this.accountId}/balance`)
      .pipe(map((result) => result.balance));
  }

  getMovimenti(): Observable<Movimento[]> {
    return this.http
      .get<{ transactions: any[] }>(`${this.apiUrl}/accounts/${this.accountId}/transactions`)
      .pipe(
        map((result) => result.transactions.map((tx) => this.mapTransaction(tx))),
        catchError(() => of(this.movimenti))
      );
  }

  getMovimentoById(id: number): Observable<Movimento | undefined> {
    return this.http
      .get<any>(`${this.apiUrl}/accounts/${this.accountId}/transactions/${id}`)
      .pipe(
        map((tx) => this.mapTransaction(tx)),
        catchError(() => of(this.movimenti.find((m) => m.id === id)))
      );
  }

  depositaConto(dep: number, descrizione: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/accounts/${this.accountId}/deposits`, {
        amount: dep,
        description: descrizione,
      })
      .pipe(
        tap(() => this.refreshSaldo()),
        catchError((error) => {
          this.refreshSaldo();
          throw error;
        })
      );
  }

  prelievoConto(dep: number, descrizione: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/accounts/${this.accountId}/withdrawals`, {
        amount: dep,
        description: descrizione,
      })
      .pipe(
        tap(() => this.refreshSaldo()),
        catchError((error) => {
          this.refreshSaldo();
          throw error;
        })
      );
  }

  private mapTransaction(tx: any): Movimento {
    return {
      id: tx.id,
      data: new Date(tx.created_at),
      tipo: tx.type === 'deposit' ? 'Deposito' : 'Prelievo',
      importo: Number(tx.amount),
      descrizione: tx.description || '',
    };
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
    this.saldoSubject.next(this.calculateLocalSaldo());
  }

  addMovimento(movimento: Movimento) {
    this.movimenti.push(movimento);
    this.saldoSubject.next(this.calculateLocalSaldo());
  }
}
