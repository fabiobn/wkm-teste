import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {exhaustMap, map, switchMap} from 'rxjs/operators';
import {TipoOrdemEnum} from '../enum/tipo-ordem.enum';
import {AcaoUsuario} from '../model/acao-usuario.model';
import {Acao} from '../model/acao.model';
import {FinanceiroServiceModule} from './financeiro.service.module';
import {Ordem} from '../model/ordem.model';
import {Erro} from '../model/erro.model';


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
		quantidade: 50,
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
		ordens: [
			{id: 1, acao: {id: 2, nome: 'EMPRESA ABCD', descricao: 'DESCRICAO ACAO DA EMPRESA ABCD', valorUnitario: 10}, tipo: TipoOrdemEnum.COMPRA, quantidade: 5, valor: 50},
			{id: 2, acao: {id: 2, nome: 'EMPRESA ABCD', descricao: 'DESCRICAO ACAO DA EMPRESA ABCD', valorUnitario: 10}, tipo: TipoOrdemEnum.VENDA, quantidade: 5, valor: 50}
		]
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

	private count = 100;

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

	obterProximoId(): number {
		return this.count++;
	}

	incluirOrdem(idAcaoUsuario: number, ordem: Ordem): Observable<Ordem> {
		return of(idAcaoUsuario).pipe(
			map((id: number) => ACOES_USUARIO.find((acao: AcaoUsuario) => acao.id === id)),
			exhaustMap((acaoUsuario: AcaoUsuario) => {
				if (!!acaoUsuario && !!ordem) {
					if (TipoOrdemEnum.VENDA === ordem.tipo) {
						const quantidadeTotalOrdemVendaAbertas = acaoUsuario.ordens.reduce(
							(total: number, o: Ordem) => TipoOrdemEnum.VENDA  === o.tipo ? total + o.quantidade : total,
						0);

						if (quantidadeTotalOrdemVendaAbertas + ordem.quantidade > acaoUsuario.quantidade) {
							const erro: Erro = {
								codigo: 2,
								mensagem: 'O usuário não possui quantidade suficiente de ações para criar esta ordem de venda.',
								detalhe: 'O usuário não possui quantidade suficiente para o somatório das quantidades das ordens de venda em aberto e a quantidade desta ordem de venda.'
							};
							return throwError(erro);
						}
					}
					let isOrdemAberta = false;
					if (TipoOrdemEnum.VENDA === ordem.tipo) {
						const menorValorOrdemVendaAberto = acaoUsuario.ordens.reduce(
							(menorValor: number, o: Ordem) => {
								if (TipoOrdemEnum.VENDA  === o.tipo) {
									if (menorValor < 0 || o.valor < menorValor)
										return o.valor;
								}
								return menorValor;
							}, -1);
						if (ordem.valor < menorValorOrdemVendaAberto)
							isOrdemAberta = true;
					}
					if (!isOrdemAberta && TipoOrdemEnum.COMPRA === ordem.tipo) {
						const maiorValorOrdemCompraAberto = acaoUsuario.ordens.reduce(
							(maiorValor: number, o: Ordem) => {
								if (TipoOrdemEnum.COMPRA  === o.tipo) {
									if (maiorValor < 0 || o.valor > maiorValor)
										return o.valor;
								}
								return maiorValor;
							}, -1);
						if (ordem.valor > maiorValorOrdemCompraAberto)
							isOrdemAberta = true;
					}

					ordem.id = this.count++;

					if (isOrdemAberta)
						acaoUsuario.ordens.push(ordem);
					else
						acaoUsuario.quantidade = TipoOrdemEnum.COMPRA ? (acaoUsuario.quantidade + ordem.quantidade) : (acaoUsuario.quantidade - ordem.quantidade);

					return of(ordem);
				} else {
					const erro: Erro = {
						codigo: 1,
						mensagem: 'Problema ao criar a ordem para a ação do usuário.',
						detalhe: 'Problema no objeto de ação usuário ou ordem a ser criada.'
					};
					return throwError(erro);
				}
			})
		);
	}
}