import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { PostService } from '../post/post.service';

@Injectable()
export class SocketsService {
  socket: SocketIOClient.Socket;
  constructor(public postService: PostService) {
    this.socket = io.connect('http://localhost:3000');

  }

  receiveMsg() {
    this.socket.on('message-received', (msg: any) => {
      console.log(msg);
    });
  }
  /*
  socketPost() {
    return new Promise((resolve, reject) => {
      this.socket.on('event6', (data: any) => {
        resolve(data);
      });
    });
  }

  socketDeletePost() {
    return new Promise((resolve, reject) => {
      this.socket.on('event8', (data: any) => {
        resolve(data);
      });
    });
  }
*/
  emitSocketPost(data) {
    this.socket.emit('event5', {
      post: data
    });
  }

  emitSocketDeletePost(data) {
    this.socket.emit('event7', {
      post: data
    });
  }

}
