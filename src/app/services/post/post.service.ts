import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import Swal from 'sweetalert2';
import { Post } from '../../models/post.model';
import { LoginService } from '../login/login.service';
import { Like } from './../../models/like.model';

@Injectable()
export class PostService {

  constructor(public http: HttpClient, public loginService: LoginService) { }

  newPost(post: Post) {
    let url = BASE_URL + '/posts';
    url += '?token=' + this.loginService.token;

    return this.http.post(url, post)
      .map((resp: any) => {
          return resp.post;
      })
      .catch(err => {
        console.log(err);
        Swal('Oooops', 'Algo salió mal, vuelva a intentarlo', 'error');
        return Observable.throw(err);
      });
  }

  getPosts(desde: number) {
    const url = BASE_URL + '/posts?desde=' + desde;
    return this.http.get(url)
      .map((resp: any) => {
        return resp.posts;
      });
  }

  getPost(id) {
    const url = BASE_URL + '/posts/' + id;
    return this.http.get(url)
      .map((resp: any) => {
        return resp.post;
      });
  }


  deletePost(id: string) {
    let url = BASE_URL + '/posts/' + id;
    url += '?token=' + this.loginService.token;

    return this.http.delete(url)
      .map((resp: any) => {
        return resp.post;
      })
      .catch(err => {
        console.log(err);
        Swal('Oooops', 'Algo salió mal, vuelva a intentarlo', 'error');
        return Observable.throw(err);
      });

  }

  getUserPosts(user_id: string, desde: number) {
    const url = `${BASE_URL}/users/${user_id}/posts?desde=${desde}`;
    return this.http.get(url)
      .map((resp: any) => {
        return resp.posts;
      })
      .catch(err => {
        console.log(err);
        Swal('Oooops', 'Algo salió mal, vuelva a intentarlo', 'error');
        return Observable.throw(err);
      });
  }


  getPostLikes(id: string) {
    let url = BASE_URL + '/posts/' + id + '/like';
    url += '?token=' + this.loginService.token;
    return this.http.get(url)
      .map((res: any) => {
        return res.likes;
      })
      .catch(err => {
        console.log(err);
        Swal('Oooops', 'Algo salió mal, vuelva a intentarlo', 'error');
        return Observable.throw(err);
      });
  }

  likePost(id: string) {
    let url = BASE_URL + '/posts/' + id + '/like';
    url += '?token=' + this.loginService.token;
    return this.http.post(url, {user_id: this.loginService.id})
      .map((resp: any) => {
        return resp.post;
      })
      .catch(err => {
        console.log(err);
        Swal('Oooops', 'Algo salió mal, vuelva a intentarlo', 'error');
        return Observable.throw(err);
      });
  }

}
