import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import Swal from 'sweetalert2';
@Injectable()
export class UsuarioService {

  constructor(public http: HttpClient) { }

  getUser(slug: string) {
    const url = BASE_URL + '/users/' + slug;
    return this.http.get(url)
      .map((resp: any) => {
        return resp.user;
      })
      .catch(err => {
        console.log(err);
        return Observable.throw(err);
      });
  }

  subirArchivo(archivo: File, id: string, token: string, type: string) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('IMAGEN SUBIDA');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Falló la subida');
            reject(xhr.response);
          }
        }
      };

      let url = BASE_URL + '/files/' + type + '/usuario/' + id;
      url += '?token=' + token;

      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }

}
