import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {FinanceiroModule} from '../financeiro.module';
import {FinanceiroServiceModule} from './financeiro.service.module';


const ACOES: Acao[] = [
	{id: 1, nome: 'COMPANHIA XPTO'},
	{id: 2, nome: 'EMPRESA ABCD'},
	{id: 3, nome: 'XYZ S.A.'},
	{id: 4, nome: 'COMPANHIA XXYY'},
	{id: 5, nome: 'COMPANHIA RJ LTDA'},
	{id: 6, nome: 'EMPRESA 123 S.A.'},
	{id: 7, nome: 'TRANSP RJSP LTDA'},
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
}