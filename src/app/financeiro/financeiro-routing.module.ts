import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetalheAcaoComponent} from './containers/detalhe-acao/detalhe-acao.component';
import {ListaAcoesComponent} from './containers/lista-acoes/lista-acoes.component';

const routes: Routes = [
  { path: '', redirectTo: 'lista-acoes', pathMatch: 'full' },
  { path: 'lista-acoes', component: ListaAcoesComponent },
  { path: 'acao-detalhe/:id', component: DetalheAcaoComponent }
];

@NgModule({
  imports: [
	  RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FinanceiroRoutingModule { }
