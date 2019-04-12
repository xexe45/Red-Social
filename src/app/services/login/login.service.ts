import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BASE_URL } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Usuario } from './../../models/user.model';
import Swal from 'sweetalert2';

@Injectable()
export class LoginService {
  usuario: Usuario;
  token: string;
  id: string;
  constructor(public http: HttpClient, public router: Router) {
    this.cargarStorage();
  }

  estaLogueado() {
    return this.token.length > 4 ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.id = localStorage.getItem('id');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.id = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
    this.id = id;
  }

  public login(usuario: Usuario) {
    const url = BASE_URL + '/login';
    return this.http.post(url, usuario)
      .map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
      .catch(err => {
        console.log(err);
        Swal(err.error.errors.message, err.error.mensaje, 'error');
        return Observable.throw(err);
      });
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.id = '';
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  newUser(user: Usuario) {
    const url = `${BASE_URL}/users`;
    return this.http.post(url, user)
      .map((resp: any) => {
        return resp.user;
      })
      .catch(err => {
        console.log(err);
        Swal('Oooops', 'Algo salió mal, puede que el usuario ya existe', 'error');
        return Observable.throw(err);
      });

  }

}
