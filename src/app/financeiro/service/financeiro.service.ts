import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {TipoOrdemEnum} from '../enum/tipo-ordem.enum';
import {AcaoUsuario} from '../model/acao-usuario.model';
import {Acao} from '../model/acao.model';
import {FinanceiroServiceModule} from './financeiro.service.module';


const ACOES: Acao[] = [
	{id: 1, nome: 'COMPANHIA XPTO', descricao: 'DESCRICAO ACAO DA COMPANHIA XPTO', valorUnitario: 5},
	{id: 2, nome: 'EMPRESA ABCD', descricao: 'DESCRICAO ACAO DA EMPRESA ABCD', valorUnitario: 10},
	{id: 3, nome: 'XYZ S.A.', descricao: 'DESCRICAO ACAO DA XYZ S.A.', valorUnitario: 15},
	{id: 4, nome: 'COMPANHIA XXYY', descricao: 'DESCRICAO ACAO DA COMPANHIA XXYY', valorUnitario: 20},
	{id: 5, nome: 'COMPANHIA RJ LTDA', descricao: 'DESCRICAO ACAO DA COMPANHIA RJ LTDA', valorUnitario: 25},
	{id: 6, nome: 'EMPRESA 123 S.A.', descricao: 'DESCRICAO ACAO DA EMPRESA 123 S.A.', valorUnitario: 30},
	{id: 7, nome: 'TRANSP RJSP LTDA', descricao: 'DESCRICAO ACAO DA TRANSP RJSP LTDA', valorUnitario: 35},
];

const ACOES_USUARIO: AcaoUsuario[] = [
	{
		id: 1,
		acao: {id: 1, nome: 'COMPANHIA XPTO', descricao: 'DESCRICAO ACAO DA COMPANHIA XPTO', valorUnitario: 5},
		quantidade: 5,
		valorTotal: 0,
		ordens: [
			{id: 1, acao: {id: 1, nome: 'COMPANHIA XPTO', descricao: 'DESCRICAO ACAO DA COMPANHIA XPTO', valorUnitario: 5}, tipo: TipoOrdemEnum.COMPRA, quantidade: 5, valor: 25},
			{id: 2, acao: {id: 1, nome: 'COMPANHIA XPTO', descricao: 'DESCRICAO ACAO DA COMPANHIA XPTO', valorUnitario: 5}, tipo: TipoOrdemEnum.VENDA, quantidade: 5, valor: 25}
		]
	},
	{
		id: 2,
		acao: {id: 2, nome: 'EMPRESA ABCD', descricao: 'DESCRICAO ACAO DA EMPRESA ABCD', valorUnitario: 10},
		quantidade: 10,
		valorTotal: 0,
		ordens: []
	},
	{
		id: 7,
		acao: {id: 7, nome: 'TRANSP RJSP LTDA', descricao: 'DESCRICAO ACAO DA TRANSP RJSP LTDA', valorUnitario: 35},
		quantidade: 5,
		valorTotal: 0,
		ordens: []
	}
];

@Injectable({
	providedIn: FinanceiroServiceModule
})
export class FinanceiroService {

	constructor() {
	}

	listarAcoes(): Observable<Acao[]> {
		return of(ACOES);
	}

	obterAcaoUsuario(id: number): Observable<AcaoUsuario> {
		return of(ACOES_USUARIO).pipe(
			switchMap((acoesUsuario: AcaoUsuario[]) => {
				let acaoUsuario: AcaoUsuario;

				const acaoSelecionadaIndex: number = ACOES.findIndex((acaoDisponivel: Acao) => acaoDisponivel.id === id);
				const acaoUsuarioIndex = acoesUsuario.findIndex((acaoUsu) => acaoUsu.acao.id === id);

				if (acaoUsuarioIndex >= 0) {
					acaoUsuario = {
						...acoesUsuario[acaoUsuarioIndex],
						valorTotal: acoesUsuario[acaoUsuarioIndex].acao.valorUnitario * acoesUsuario[acaoUsuarioIndex].quantidade
					};
					return of(acaoUsuario);
				} else {
					acaoUsuario = {
						acao: ACOES[acaoSelecionadaIndex],
						quantidade: 0,
						valorTotal: 0,
						id: null,
						ordens: []
					};
					return of(acaoUsuario);
				}
			})
		)
	}
}