import { Injectable } from '@angular/core';
import { Transaction } from './model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Bankservice {
  private readonly apiUrl = 'http://localhost:8080';
  private readonly accountId = 1;

  movimenti: Transaction[] = [];



  constructor(private http: HttpClient) {

  }
 getBalance(accountId: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/accounts/${accountId}/balance`
    );
  }

 getTransactions(accountId: number): Observable<Transaction> {
    return this.http.get<Transaction>(
      `${this.apiUrl}/accounts/${accountId}/transactions`
    );
  }

getTransactionById(accountId: number, transactionId: number): Observable<Transaction> {
    return this.http.get<Transaction>(
      `${this.apiUrl}/accounts/${accountId}/transactions/${transactionId}`
    );
  }

doDeposit(accountId: number, amount: number, description: string): Observable<Transaction> {
    const url = `${this.apiUrl}/accounts/${accountId}/deposits`;
    const body = { amount: amount,
      description: description };

    return this.http.post<Transaction>(url, body);
  }

  doWithdrawals(accountId: number, amount: number, description: string): Observable<Transaction> {
    const url = `${this.apiUrl}/accounts/${accountId}/withdrawals`;
    const body = { amount: amount,
      description: description };

    return this.http.post<Transaction>(url, body);
  }

  getFiatValue(accountId: number): Observable<Transaction> {
    return this.http.get<Transaction>(
      `${this.apiUrl}/accounts/${accountId}/balance/convert/fiat`
    );
    }

      getCryptoValue(accountId: number): Observable<Transaction> {
    return this.http.get<Transaction>(
      `${this.apiUrl}/accounts/${accountId}/balance/convert/crypto`
    );
    }

}
