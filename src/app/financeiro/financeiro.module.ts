import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ListaAcoesComponent } from './containers/lista-acoes/lista-acoes.component';
import {FinanceiroRoutingModule} from './financeiro-routing.module';
import {FinanceiroServiceModule} from './service/financeiro.service.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  	FinanceiroRoutingModule,
  	FinanceiroServiceModule
  ],
  declarations: [ListaAcoesComponent]
})
export class FinanceiroModule {}
