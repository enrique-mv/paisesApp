import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorPais, Pais } from '../interfaces/pais.interface';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private _apiUrl: string = 'https://restcountries.com/v2';

  get httpParams () {
    return new HttpParams().set('fields', 'name,capital,alpha2Code,flag,population');
  }

  constructor(private http: HttpClient) { }

  buscarPais(termino: string): Observable<Pais[] | ErrorPais> {

    const url = `${this._apiUrl}/name/${termino}`;

    return this.http.get<Pais[] | ErrorPais>(url, {params: this.httpParams})
  }

  buscarCapital(termino: string): Observable<Pais[] | ErrorPais> {

    const url = `${this._apiUrl}/capital/${termino}`;

    return this.http.get<Pais[] | ErrorPais>(url, {params: this.httpParams})

  }

  buscarAlphaPais(id: string): Observable<Pais | ErrorPais> {

    const url = `${this._apiUrl}/alpha/${id}`;

    return this.http.get<Pais | ErrorPais>(url)

  }

  buscarRegion(region: string): Observable<Pais[] | ErrorPais> {

    const url = `${this._apiUrl}/regionalbloc/${region}`;

    return this.http.get<Pais[] | ErrorPais>(url, {params: this.httpParams})
      .pipe(
        tap(console.log)
      )
  }

}
