import { Routes } from '@angular/router';
import { Navabar } from './components/navabar/navabar';
import { Deposito } from './components/deposito/deposito';
import { Prelievo } from './components/prelievo/prelievo';
import { Saldo } from './components/saldo/saldo';
import { Fiat } from './components/fiat/fiat';
import { DettaglioMovimenti } from './components/dettaglio-movimenti/dettaglio-movimenti';
import { ListaMovimenti } from './components/lista-movimenti/lista-movimenti';
import { Crypto } from './components/crypto/crypto';
import { Login } from './components/login/login';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'deposit', component: Deposito },
  { path: 'prelievo', component: Prelievo },
  { path: 'saldo', component: Saldo },
  { path: 'prelievi', component: Prelievo },
  { path: 'movimenti', component: ListaMovimenti },
  { path: 'movimenti/:id', component: DettaglioMovimenti },
  { path: 'converti-fiat', component: Fiat },
  { path: 'converti-crypto', component: Crypto },
];
