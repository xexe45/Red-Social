import { LoginService } from './../login/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(public _loginService: LoginService, public router: Router) { }
  canActivate(): boolean {
    if (this._loginService.estaLogueado()) {
      console.log('Puedes entrar');
      return true;
    } else {
      console.error('Necesita autenticarse para poder entrar');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
