import {Injectable} from '@angular/core';
import {TipoOrdemEnum} from '../enum/tipo-ordem.enum';
import {AcaoUsuario} from '../model/acao-usuario.model';
import {Acao} from '../model/acao.model';
import {Erro} from '../model/erro.model';
import {Ordem} from '../model/ordem.model';
import {FinanceiroServiceModule} from './financeiro.service.module';


// Valores que reprentam as ações disponíveis
const ACOES: Acao[] = [
	{id: 1, nome: 'COMPANHIA XPTO', descricao: 'DESCRICAO ACAO DA COMPANHIA XPTO', valorUnitario: 5},
	{id: 2, nome: 'EMPRESA ABCD', descricao: 'DESCRICAO ACAO DA EMPRESA ABCD', valorUnitario: 10},
	{id: 3, nome: 'XYZ S.A.', descricao: 'DESCRICAO ACAO DA XYZ S.A.', valorUnitario: 15},
	{id: 4, nome: 'COMPANHIA XXYY', descricao: 'DESCRICAO ACAO DA COMPANHIA XXYY', valorUnitario: 20},
	{id: 5, nome: 'COMPANHIA RJ LTDA', descricao: 'DESCRICAO ACAO DA COMPANHIA RJ LTDA', valorUnitario: 25},
	{id: 6, nome: 'EMPRESA 123 S.A.', descricao: 'DESCRICAO ACAO DA EMPRESA 123 S.A.', valorUnitario: 30},
	{id: 7, nome: 'TRANSP RJSP LTDA', descricao: 'DESCRICAO ACAO DA TRANSP RJSP LTDA', valorUnitario: 35},
];

// Valores que repesentam as ações do usuário
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

	/**
	 * Listar as ações disponíveis.
	 */
	listarAcoes(): Acao[] {
		return ACOES;
	}

	/**
	 * Obter a ação do usuário.
	 * @param id Identificador da ação do usuário.
	 */
	obterAcaoUsuario(id: number): AcaoUsuario {

		const acaoSelecionadaIndex: number = ACOES.findIndex((acaoDisponivel: Acao) => acaoDisponivel.id === id);
		const acaoUsuarioIndex = ACOES_USUARIO.findIndex((acaoUsu) => acaoUsu.acao.id === id);

		if (acaoUsuarioIndex >= 0) {
			ACOES_USUARIO[acaoUsuarioIndex].valorTotal = ACOES_USUARIO[acaoUsuarioIndex].acao.valorUnitario * ACOES_USUARIO[acaoUsuarioIndex].quantidade;
			return ACOES_USUARIO[acaoUsuarioIndex];
		} else {
			return {
				acao: ACOES[acaoSelecionadaIndex],
				quantidade: 0,
				valorTotal: 0,
				id: null,
				ordens: []
			};
		}
	}

	/**
	 * Incluir uma nova ordem.
	 * @param idAcaoUsuario Identificador da ação do usuário.
	 * @param ordem Ordem a ser incluída.
	 */
	incluirOrdem(idAcaoUsuario: number, ordem: Ordem): Ordem {
		// Obter a ação do usuário
		const acaoUsuario =  ACOES_USUARIO.find((acao: AcaoUsuario) => acao.id === idAcaoUsuario);

		// Verificar se existem a ação e a ordem
		if (!!acaoUsuario && !!ordem) {
			// Verificar se o tipo da nova ordem é venda
			if (TipoOrdemEnum.VENDA === ordem.tipo) {
				// Definir a quantidade total de ordens de venda abertas
				const quantidadeTotalOrdemVendaAbertas = acaoUsuario.ordens.reduce(
					(total: number, o: Ordem) => TipoOrdemEnum.VENDA  === o.tipo ? total + o.quantidade : total,
				0);

				// Verificar se a quantidade da ordem mais a quantidade total de ordens de venda abertas é maior que a quantidade de ação atual do usuário
				if (quantidadeTotalOrdemVendaAbertas + ordem.quantidade > acaoUsuario.quantidade) {
					// Sinalizar erro
					const erro: Erro = {
						codigo: 2,
						mensagem: 'O usuário não possui quantidade suficiente de ações para criar esta ordem de venda.',
						detalhe: 'O usuário não possui quantidade suficiente para o somatório das quantidades das ordens de venda em aberto e a quantidade desta ordem de venda.'
					};
					throw erro;
				}
			}

			// Flag para definir se a nova ordem será aberta
			let isOrdemAberta = false;

			// Verificar se a nova ordem é do tipo venda
			if (TipoOrdemEnum.VENDA === ordem.tipo) {
				// Definir o menor valor de ordem de venda em aberto
				const menorValorOrdemVendaAberto = acaoUsuario.ordens.reduce(
					(menorValor: number, o: Ordem) => {
						if (TipoOrdemEnum.VENDA  === o.tipo) {
							if (menorValor < 0 || o.valor < menorValor)
								return o.valor;
						}
						return menorValor;
					}, -1);

				// Verificar se o valor da nova ordem é menor que o menor valor da ordem de venda em aberto
				// Definir que a ordem ficará em aberto(não processada automaticamente)
				if (ordem.valor < menorValorOrdemVendaAberto)
					isOrdemAberta = true;
			}

			// Verificar se o tipo da nova ordem é compra e ainda não foi definido que ela será aberta(não processada automaticamente)
			if (!isOrdemAberta && TipoOrdemEnum.COMPRA === ordem.tipo) {
				// Definir o maior valor de ordem de compra em aberto
				const maiorValorOrdemCompraAberto = acaoUsuario.ordens.reduce(
					(maiorValor: number, o: Ordem) => {
						if (TipoOrdemEnum.COMPRA  === o.tipo) {
							if (maiorValor < 0 || o.valor > maiorValor)
								return o.valor;
						}
						return maiorValor;
					}, -1);

				// Verificar se o valor da nova ordem é maior que o maior valor da ordem de compra em aberto
				// Definir que a ordem ficará em aberto(não processada automaticamente)
				if (ordem.valor > maiorValorOrdemCompraAberto)
					isOrdemAberta = true;
			}

			// Definir o id da nova ordem
			ordem.id = this.count++;

			// Verifficar se a nova ordem será aberta(não processada automaticamente)
			if (isOrdemAberta)
				// Incluir no array de ordens em aberto da ação do usuário
				acaoUsuario.ordens.push(ordem);
			else {
				// Processar automaticamente a ordem, somando/diminuindo da quantidade e do valor da ação do usuário
				acaoUsuario.quantidade = TipoOrdemEnum.COMPRA === ordem.tipo ? (acaoUsuario.quantidade + ordem.quantidade) : (acaoUsuario.quantidade - ordem.quantidade);
				acaoUsuario.valorTotal = acaoUsuario.acao.valorUnitario * acaoUsuario.quantidade;
			}

			return ordem;
		} else {
			// Definir erro para algum problema na ação do usuário ou da nova ordem
			const erro: Erro = {
				codigo: 1,
				mensagem: 'Problema ao criar a ordem para a ação do usuário.',
				detalhe: 'Problema no objeto de ação usuário ou ordem a ser criada.'
			};
			throw erro;
		}
	}
}