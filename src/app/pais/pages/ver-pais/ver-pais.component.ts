import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";
import { PaisService } from '../../services/pais.service';
import { ErrorPais, Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  hayError: boolean = false;
  msjError: string = '';
  pais!: Pais;

  constructor(private activatedRoute: ActivatedRoute, private paisService: PaisService) { }



  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.paisService.buscarAlphaPais(id)),
        tap(console.log)
      )
      .subscribe((resp) => this.pais = <Pais>resp );

  }

}
