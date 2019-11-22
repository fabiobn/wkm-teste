import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {AcaoUsuario} from '../../model/acao-usuario.model';
import {Ordem} from '../../model/ordem.model';
import {FinanceiroService} from '../../service/financeiro.service';
import {Erro} from '../../model/erro.model';


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

		this.acaoUsuario = this.financeiroService.obterAcaoUsuario(this.idAcaoUsuario);

		this.formOrdem = this.formBuilder.group({
			tipoOrdem: ['', Validators.required],
			quantidade: [0, Validators.required],
			valor: [0]
		});

	}

	calcularValor() {
		this.formOrdem.get('valor').setValue(this.acaoUsuario.acao.valorUnitario * this.formOrdem.get('quantidade').value);
	}

	confirmar() {
		if (!!this.formOrdem.get('quantidade').value) {
			this.ordem = {
				id: null,
				acao: this.acaoUsuario.acao,
				tipo: this.formOrdem.get('tipoOrdem').value,
				quantidade: this.formOrdem.get('quantidade').value,
				valor: this.formOrdem.get('valor').value
			};
			try {
				const novaOrdem: Ordem = this.financeiroService.incluirOrdem(this.acaoUsuario.id, this.ordem);
				this.modal.dismiss(novaOrdem);
			} catch(erro) {
				this.hasErrorCriacaoOrdem = true;
				this.msgErrorCriacaoOrdem = erro.mensagem;
			}
		} else {
			this.hasErrorCriacaoOrdem = true;
			this.msgErrorCriacaoOrdem = 'A quantidade da ordem não pode ser 0.';
		}
	}

	cancelar() {
		this.modal.dismiss({});
	}

}
