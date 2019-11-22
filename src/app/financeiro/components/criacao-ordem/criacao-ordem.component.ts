import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {AcaoUsuario} from '../../model/acao-usuario.model';
import {Ordem} from '../../model/ordem.model';
import {FinanceiroService} from '../../service/financeiro.service';


@Component({
  selector: 'criacao-ordem',
  templateUrl: 'criacao-ordem.component.html',
  styleUrls: ['criacao-ordem.component.scss'],
})
export class CriacaoOrdemComponent implements OnInit {

	@Input()
	public idAcaoUsuario: number;

	public formOrdem: FormGroup;
	private ordem: Ordem;
	public acaoUsuario: AcaoUsuario;
	public hasErrorCriacaoOrdem = false;
	public msgErrorCriacaoOrdem = '';

	constructor(private modal: ModalController, private formBuilder: FormBuilder, private financeiroService: FinanceiroService) {}

	ngOnInit() {

		//Obter as informações da ação do usuário
		this.acaoUsuario = this.financeiroService.obterAcaoUsuario(this.idAcaoUsuario);

		this.formOrdem = this.formBuilder.group({
			tipoOrdem: ['', Validators.required],
			quantidade: [0, Validators.required],
			valor: [0]
		});

	}

	/**
	 * Calcular o valor da ordem mediante a quantidade preenchida.
	 */
	calcularValor() {
		this.formOrdem.get('valor').setValue(this.acaoUsuario.acao.valorUnitario * this.formOrdem.get('quantidade').value);
	}

	/**
	 * Confirmar a inclusão da ordem.
	 */
	confirmar() {
		// Verificar se existe quantidade preenchida
		if (!!this.formOrdem.get('quantidade').value) {
			// Definir o objeto para a nova ordem
			this.ordem = {
				id: null,
				acao: this.acaoUsuario.acao,
				tipo: this.formOrdem.get('tipoOrdem').value,
				quantidade: this.formOrdem.get('quantidade').value,
				valor: this.formOrdem.get('valor').value
			};

			try {
				// Incluir a nova ordem
				const novaOrdem: Ordem = this.financeiroService.incluirOrdem(this.acaoUsuario.id, this.ordem);
				// Fechar o modal
				this.modal.dismiss(novaOrdem);
			} catch(erro) {
				// Caso haja erro na inclusão da ordem, definir flag e mensagem de erro para a tela
				this.hasErrorCriacaoOrdem = true;
				this.msgErrorCriacaoOrdem = erro.mensagem;
			}
		} else {
			// Caso a quantidade seja preenchida com 0, definir flag e mensagem de erro para a tela
			this.hasErrorCriacaoOrdem = true;
			this.msgErrorCriacaoOrdem = 'A quantidade da ordem não pode ser 0.';
		}
	}

	/**
	 * Fechar o modal, cancelando a inclusão da ordem.
	 */
	cancelar() {
		this.modal.dismiss({});
	}

}
