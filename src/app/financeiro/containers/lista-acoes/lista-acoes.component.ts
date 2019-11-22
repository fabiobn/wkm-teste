import {Component, OnInit} from '@angular/core';
import {Acao} from '../../model/acao.model';
import {FinanceiroService} from '../../service/financeiro.service';

@Component({
  selector: 'lista-acoes',
  templateUrl: 'lista-acoes.component.html',
  styleUrls: ['lista-acoes.component.scss'],
})
export class ListaAcoesComponent implements OnInit {

	public acoes: Acao[];

  constructor(private financeiroService: FinanceiroService) {}

	ngOnInit() {
		this.acoes = this.financeiroService.listarAcoes();
	}
}
