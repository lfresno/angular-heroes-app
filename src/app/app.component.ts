import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'heroesApp';


  // constructor(private authService:AuthService) {}

  // ngOnInit(): void {

  //   //autenticamos aquí porque siempre que se abre la app se pasa por aquí
  //   this.authService.checkAuthentication().subscribe( () => {
  //     console.log('check auth finished')
  //   })
  // }
}
