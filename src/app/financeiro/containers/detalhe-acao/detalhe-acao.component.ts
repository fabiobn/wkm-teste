import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AcaoUsuario} from '../../model/acao-usuario.model';
import {FinanceiroService} from '../../service/financeiro.service';

@Component({
  selector: 'detalhe-acao',
  templateUrl: 'detalhe-acao.component.html',
  styleUrls: ['detalhe-acao.component.scss'],
})
export class DetalheAcaoComponent implements OnInit {

	public acaoUsuario$: Observable<AcaoUsuario>;

	constructor(private financeiroService: FinanceiroService, private route: ActivatedRoute) {}

	ngOnInit() {
		this.acaoUsuario$ = this.route.paramMap.pipe(
			switchMap((params: ParamMap) => {
				console.log(params.get('id'));
				return this.financeiroService.obterAcaoUsuario(Number(params.get('id')));
			})
		);
	}

}
