import {Acao} from './acao.model';
import {Ordem} from './ordem.model';

export interface AcaoUsuario {
	id: number;
	acao: Acao;
	quantidade: number;
	valorTotal: number;
	ordens?: Ordem[];
}