import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CriacaoOrdemComponent} from './components/criacao-ordem/criacao-ordem.component';
import {DetalheAcaoComponent} from "./components/detalhe-acao/detalhe-acao.component";
import {AcaoUsuarioComponent} from './containers/acao-usuario/acao-usuario.component';
import {ListaAcoesComponent} from './containers/lista-acoes/lista-acoes.component';
import {FinanceiroRoutingModule} from './financeiro-routing.module';
import {FinanceiroServiceModule} from './service/financeiro.service.module';
import {HeaderUsuarioComponent} from "./components/header-usuario/header-usuario.component";
import {HeaderPaginaComponent} from "./components/header-pagina/header-pagina.component";

@NgModule({
  imports: [
  	SharedModule,
  	FinanceiroRoutingModule,
  	FinanceiroServiceModule
  ],
    declarations: [
    	ListaAcoesComponent,
		AcaoUsuarioComponent,
		DetalheAcaoComponent,
		CriacaoOrdemComponent,
		HeaderUsuarioComponent,
		HeaderPaginaComponent],
	entryComponents: [CriacaoOrdemComponent]
})
export class FinanceiroModule {}
