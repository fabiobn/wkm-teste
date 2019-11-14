import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Acao} from '../../model/acao.model';
import {FinanceiroService} from '../../service/financeiro.service';

@Component({
  selector: 'lista-acoes',
  templateUrl: 'lista-acoes.component.html',
  styleUrls: ['lista-acoes.component.scss'],
})
export class ListaAcoesComponent implements OnInit {

	public acoes$: Observable<Acao[]>;

  constructor(private financeiroService: FinanceiroService) {}

	ngOnInit() {
		this.acoes$ = this.financeiroService.listarAcoes();
	}

	selecionarAcao() {
  		console.log("selecionou acao");
	}
}
