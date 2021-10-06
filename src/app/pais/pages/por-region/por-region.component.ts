import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { ErrorPais, Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button {
      margin-right: 5px;
    }

  `
  ]
})
export class PorRegionComponent {

  regiones: string[] = ['EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU', 'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC' ];
  regionActiva: string = '';
  hayError: boolean = false;
  MsjError: string = '';
  paises: Pais[] = [];

  constructor( private _paisService: PaisService) { }

  getClaseCSS( region:string ) {
    return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary';
  }

  activaRegion(region: string) {

    if (region === this.regionActiva) { return; }
    
    this.regionActiva = region;
    this.paises = [];

    this._paisService.buscarRegion(region)
    .subscribe((resp) => {

      let error = resp as ErrorPais

      console.log(resp);

      if (error.status === 404) {
        this.hayError = true;
        this.MsjError = `No se encontraron coincidencias con la busqueda: ${region}`
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

}
