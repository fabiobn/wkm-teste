import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {TipoOrdemEnum} from '../../enum/tipo-ordem.enum';
import {Acao} from '../../model/acao.model';


@Component({
  selector: 'criacao-ordem',
  templateUrl: 'criacao-ordem.component.html',
  styleUrls: ['criacao-ordem.component.scss'],
})
export class CriacaoOrdemComponent implements OnInit {

	@Input()
	public idAcaoUsuario: number;

	constructor(private modal: ModalController) {}

	ngOnInit() {

	}

	confirmar() {
		this.modal.dismiss({id: 30,
		acao: {id: 1, nome: 'COMPANHIA XPTO', descricao: 'DESCRICAO ACAO DA COMPANHIA XPTO', valorUnitario: 5},
		tipo: TipoOrdemEnum.VENDA,
		quantidade: 5,
		valor: 25});
	}

	cancelar() {
		this.modal.dismiss({});
	}

}
