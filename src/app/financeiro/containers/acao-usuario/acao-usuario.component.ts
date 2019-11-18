import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {from, Observable, Subscription} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
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

	public acaoUsuario$: Observable<AcaoUsuario>;
	public idAcaoUsuario: number;
	private ordemModal  = null;
	private subscriptions: Subscription[] = [];
	private count = 0;
	private ordem: Ordem;

	constructor(private financeiroService: FinanceiroService, private route: ActivatedRoute, private modal: ModalController) {}

	ngOnInit() {
		this.acaoUsuario$ = this.route.paramMap.pipe(
			switchMap((params: ParamMap) => {
				console.log(params.get('id'));
				this.idAcaoUsuario = Number(params.get('id'));
				return this.financeiroService.obterAcaoUsuario(this.idAcaoUsuario);
			})
		);

	}

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
				this.ordem = o
			});

			this.ordemModal.present();
		});
	}

	@HostListener('ionViewWillLeave')
	voltar() {
		console.log('voltei');
		if (this.subscriptions)
			this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
	}
}
