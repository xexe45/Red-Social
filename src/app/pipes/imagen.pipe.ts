import { Pipe, PipeTransform } from '@angular/core';
import { BASE_URL } from './../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, tipo: string = 'profiles'): any {
    let url = BASE_URL + '/uploads/';

    if (tipo === 'profiles') {
      url += 'profiles/' + imagen;
    } else if (tipo === 'posts') {
      url += 'posts/' + imagen;
    } else if (tipo === 'fondos') {
      url += 'fondos/' + imagen;
    }
    return url;
  }

}
