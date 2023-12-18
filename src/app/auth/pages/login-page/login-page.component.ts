import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router:Router
    ) {}


  onLogin() : void{

    this.authService.login('gmail', '12345')
      .subscribe( user => { // si el login va bien se hace lo siguiente:
        this.router.navigate(['/']);
      });
  }

}
