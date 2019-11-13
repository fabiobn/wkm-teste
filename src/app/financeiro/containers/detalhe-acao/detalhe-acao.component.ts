import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FinanceiroService} from '../../service/financeiro.service';

@Component({
  selector: 'lista-acoes',
  templateUrl: 'detalhe-acao.component.html',
  styleUrls: ['detalhe-acao.component.scss'],
})
export class DetalheAcaoComponent implements OnInit {

	public acoes$: Observable<Acao[]>;

  constructor(private financeiroService: FinanceiroService) {}

	ngOnInit() {
		this.acoes$ = this.financeiroService.listarAcoes();
	}

	selecionarAcao() {
  		console.log("selecionou acao");
	}
}
