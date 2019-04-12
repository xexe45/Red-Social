import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {
  slug: string;
  user;
  posts: Post[] = [];
  desde = 0;

  constructor(public activatedRoute: ActivatedRoute,
              public userService: UsuarioService,
              public postService: PostService) {
    this.activatedRoute.params.subscribe(params => {
      this.slug = params['slug'];
      this.getUser(this.slug);
    });
   }

  ngOnInit() {

  }

  getUser(slug: string) {
    this.userService.getUser(slug)
      .subscribe(data => {
        this.user = data;
        this.getUserPosts(this.user._id);
      });
  }

  getUserPosts(user_id: string) {
    this.postService.getUserPosts(user_id, this.desde)
      .subscribe(data => {
        this.posts = data;
      });
  }

}
