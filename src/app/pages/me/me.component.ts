import { LoginService } from './../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  posts: Post[] = [];
  desde = 0;
  constructor(public loginService: LoginService, public postService: PostService) { }

  ngOnInit() {
    this.getUserPosts(this.loginService.id);
  }

  getUserPosts(user_id: string) {
    this.postService.getUserPosts(user_id, this.desde)
      .subscribe(data => {
        this.posts = data;
      });
  }
}
