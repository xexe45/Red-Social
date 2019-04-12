import { Like } from './../../models/like.model';
import { LoginService } from './../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/post.model';
import { SocketsService } from '../../services/sockets/sockets.service';
import Swal from 'sweetalert2';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  socket: SocketIOClient.Socket;
  desde = 0;
  posts: Post[] = [];
  post = '';
  img: string;

  constructor(public postService: PostService,
              public login: LoginService,
              public _sockets: SocketsService,
              ) {
    this.socket = io.connect('http://localhost:3000');
  }

  ngOnInit() {

    this.getPosts();

    this.socket.on('message-received', (msg: any) => {
      console.log(msg);
    });

    this.socket.on('event6', (data: any) => {
      this.postService.getPost(data.post._id)
        .subscribe(res => {
          this.posts.unshift(res);
        });
    });

    this.socket.on('event8', (data: any) => {
      for (const i in this.posts) {
        if (this.posts[i]._id === data.post._id) {
          this.posts.splice(Number(i), 1);
        }
      }
    });

  }

  newPost() {

    const postear = new Post(
      this.login.id,
      this.post,
      this.img
    );

    this.postService.newPost(postear)
      .subscribe( data => {
        console.log(data);
        this.post = '';
        this.img = null;
        this._sockets.emitSocketPost(data);
        this.getPosts();
      });
  }

  getPosts() {
    this.postService.getPosts(this.desde)
      .subscribe(data => {
          this.posts = data;
      });
  }

  verImagen(archivo: File) {

    if (!archivo) {
      this.img = null;
      return;
    }

    if (!archivo.type.includes('image')) {
      Swal('Oooops', 'Debes de seleccionar una imagen', 'warning');
      this.img = null;
      return;
    }

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => (this.img = reader.result);
  }

  cargarMas() {
      const desde = this.posts.length;
      console.log(desde);
      this.postService.getPosts(desde)
        .subscribe(data => {
          data.forEach(element => {
            this.posts.push(element);
          });
        });
  }

  delete(id: string) {
     this.postService.deletePost(id)
       .subscribe(data => {
         this._sockets.emitSocketDeletePost(data);
         this.getPosts();
       });
  }

  like(post: Post) {
      this.postService.likePost(post._id)
        .subscribe(data => {
          const index = this.posts.indexOf(post);
          this.posts[index].likes.push(data.likes[0]);
          console.log(this.posts);
        });
  }

  likeIt(post) {
      for (const like of post.likes) {
        if (like.likedBy === this.login.id) {
          return true;
        }
       }
  }
}
