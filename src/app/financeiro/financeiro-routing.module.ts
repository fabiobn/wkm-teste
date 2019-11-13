import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListaAcoesComponent} from './containers/lista-acoes/lista-acoes.component';

const routes: Routes = [
  { path: '', redirectTo: 'financeiro', pathMatch: 'full' },
  { path: 'financeiro', component: ListaAcoesComponent},
];

@NgModule({
  imports: [
	  RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FinanceiroRoutingModule { }
