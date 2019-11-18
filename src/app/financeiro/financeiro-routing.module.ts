import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AcaoUsuarioComponent} from './containers/acao-usuario/acao-usuario.component';
import {ListaAcoesComponent} from './containers/lista-acoes/lista-acoes.component';

const routes: Routes = [
  { path: '', redirectTo: 'lista-acoes', pathMatch: 'full' },
  { path: 'lista-acoes', component: ListaAcoesComponent },
  { path: 'acao-usuario/:id', component: AcaoUsuarioComponent }
];

@NgModule({
  imports: [
	  RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FinanceiroRoutingModule { }
