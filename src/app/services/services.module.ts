import { UsuarioService } from './usuario/usuario.service';
import { SocketsService } from './sockets/sockets.service';
import { PostService } from './post/post.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login/login.service';
import { LoginGuard } from './guards/login.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [LoginService, LoginGuard, PostService, SocketsService, UsuarioService]
})
export class ServicesModule { }
