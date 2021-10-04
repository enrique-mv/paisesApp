import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { ErrorPais, Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  MsjError: string = '';
  paises: Pais[] = [];

  constructor(private paisService: PaisService) { }

  buscar(termino: string) {

    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarPais(termino)
      .subscribe((resp) => {

        let error = resp as ErrorPais

        console.log(resp);

        if (error.status === 404) {
          this.hayError = true;
          this.MsjError = `No se encontraron coincidencias con la busqueda: ${this.termino}`
          this.paises = [];
          return;
        }

        this.paises = <Pais[]>resp;

      }, (err) => {
        this.hayError = true;
        this.MsjError = `Ha ocurrido un error ${err}`;
        this.paises = [];
      });
  }

  sugerencias(termino: string) {
    this.hayError = false;
  }



}
