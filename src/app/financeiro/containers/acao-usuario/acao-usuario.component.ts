import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {from, Subscription} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {CriacaoOrdemComponent} from '../../components/criacao-ordem/criacao-ordem.component';
import {AcaoUsuario} from '../../model/acao-usuario.model';
import {Ordem} from '../../model/ordem.model';
import {FinanceiroService} from '../../service/financeiro.service';

@Component({
  selector: 'acao-usuario',
  templateUrl: 'acao-usuario.component.html',
  styleUrls: ['acao-usuario.component.scss'],
})
export class AcaoUsuarioComponent implements OnInit {

	public acaoUsuario: AcaoUsuario;
	public idAcaoUsuario: number;
	private ordemModal  = null;
	private subscriptions: Subscription[] = [];
	private count = 0;
	private ordem: Ordem;

	constructor(private financeiroService: FinanceiroService, private route: ActivatedRoute, private modal: ModalController) {}

	ngOnInit() {
		// Obter o parâmetro com o id da ação selecionada
		this.route.paramMap.pipe(
			map((params: ParamMap) => Number(params.get('id'))),
			take(1)
		).subscribe((id: number) => {
			this.idAcaoUsuario = id;
		});
	}

	/**
	 * Obter as informações da ação do usuário ao entrar na página de detalhe de ação do usuário.
	 */
	@HostListener('ionViewWillEnter')
	viewWillEnter() {
		this.acaoUsuario = this.financeiroService.obterAcaoUsuario(this.idAcaoUsuario);
	}

	/**
	 * Abrir o modal de criação de nova ordem para ação do usuário.
	 */
	abrirCriacaoOrdem() {
		this.modal.create({
			component: CriacaoOrdemComponent,
			componentProps: {
				'idAcaoUsuario': this.idAcaoUsuario,
			}
		}).then((modalCreated) => {
			this.ordemModal = modalCreated;

			this.subscriptions[this.count++] = from(this.ordemModal.onWillDismiss()).pipe(
				map((overlayEventDetail: any) => overlayEventDetail.data)
			).subscribe((o: Ordem) => {
				console.log(o);
				this.ordem = o;
			});

			this.ordemModal.present();
		});
	}

	/**
	 * Tratar unsubscribe ao voltar do detalhe da ação do usuário.
	 */
	@HostListener('ionViewWillLeave')
	voltar() {
		if (this.subscriptions)
			this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
	}


}
