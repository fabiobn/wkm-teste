import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {AcaoUsuarioComponent} from './containers/acao-usuario/acao-usuario.component';
import { ListaAcoesComponent } from './containers/lista-acoes/lista-acoes.component';
import {FinanceiroRoutingModule} from './financeiro-routing.module';
import {FinanceiroServiceModule} from './service/financeiro.service.module';
import {DetalheAcaoComponent} from "./components/detalhe-acao/detalhe-acao.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  	FinanceiroRoutingModule,
  	FinanceiroServiceModule
  ],
    declarations: [ListaAcoesComponent, AcaoUsuarioComponent, DetalheAcaoComponent]
})
export class FinanceiroModule {}
