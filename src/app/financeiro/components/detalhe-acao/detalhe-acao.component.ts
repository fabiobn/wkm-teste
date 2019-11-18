import {Component, Input, OnInit} from '@angular/core';
import {Acao} from '../../model/acao.model';

@Component({
  selector: 'detalhe-acao',
  templateUrl: 'detalhe-acao.component.html',
  styleUrls: ['detalhe-acao.component.scss'],
})
export class DetalheAcaoComponent implements OnInit {

	@Input()
	public acao: Acao;

	constructor() {}

	ngOnInit() {
	}

}
