import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl = environments.baseUrl;


  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {

    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`);

  }

  //si el url no es válido (héroe no existe) se devuelve undefined y se redirige a otro sitio
  getHeroById(id:string ): Observable<Hero | undefined> {

    return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        catchError( error => of(undefined))  //el of es una forma de crear un observable basado en el valor que recibe como argumento
      )
  }

  getSuggestions(query: string ): Observable<Hero[]> {

    //devuelve un array con los héroes que coincidan o un array vacío si ninguno coincide con la búsqueda
    return this.http.get<Hero[]>( ` ${ this.baseUrl }/heroes?q=${ query }&_limit=6 ` );  //la forma de esta petición se puede comprobar  con postman
  }

}
