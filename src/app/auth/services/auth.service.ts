import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?:User; //cuando la app se cargue por primera vez, va a ser nulo.
  //Es private porque no queremos que se pueda modificar fuera del servicio


  constructor(private http: HttpClient) { }

  get currentUser(): User | undefined {

    if(!this.user) return undefined;

    return structuredClone(this.user);  //nuevo en node
  }

  login( email:string, password:string): Observable<User>{

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap( user => this.user = user),
        tap(user => localStorage.setItem('token', 'asfugfuuqwu.hsagdfuyg.aidoqwfo'))
      );
  }

  checkAuthentication(): Observable<boolean>{

    if( !localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap(user => this.user = user),
        map( user => !!user), //para sacar el valor boolean de user, es decir, si existe o no
        catchError( err => of(false))
      );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }
}
