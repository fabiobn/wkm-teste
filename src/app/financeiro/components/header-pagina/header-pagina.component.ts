import {Component, Input} from '@angular/core';


@Component({
  selector: 'header-pagina',
  templateUrl: 'header-pagina.component.html',
  styleUrls: ['header-pagina.component.scss'],
})
export class HeaderPaginaComponent {

    @Input()
    titulo: string;

    @Input()
    showBackButton: boolean;

    @Input()
    linkBackButton: string;

	constructor() {}

}
