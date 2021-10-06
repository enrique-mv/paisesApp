import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { ErrorPais, Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  `
    a{
      cursor: pointer;
    }
  `
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  MsjError: string = '';
  paises: Pais[] = [];
  paisesSugeridos: Pais[] = [];
  errorSugerencia: string = '';
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) { }

  buscar(termino: string) {

    this.mostrarSugerencias = false;

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

    this.termino = termino
    this.hayError = false;
    this.mostrarSugerencias = true;

    if (termino === "") {
      this.paisesSugeridos = [];
      return;
    }

    this.paisService.buscarPais(termino)
      .subscribe((resp) => {
        let error = resp as ErrorPais

        if (error.status === 400 || error.status === 404) {
          this.paisesSugeridos = [];
          return;
        }

        this.paisesSugeridos = (<Pais[]>resp).splice(0, 5);


      })
  }

  buscarSugerido(termino: string) {

    this.buscar(termino);
  }



}
