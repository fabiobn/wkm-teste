import {TipoOrdemEnum} from '../enum/tipo-ordem.enum';
import {Acao} from './acao.model';

export interface Ordem {
	id: number;
	acao: Acao;
	tipo: TipoOrdemEnum;
	quantidade: number;
	valor: number;
}