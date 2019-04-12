import { Component, OnInit, Input, TemplateRef  } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post/post.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LoginService } from '../../services/login/login.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: any = {};
  @Input() posts: Post[] = [];
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  type: string;
  img: string;
  show: false;
  imgTemporal: string;
  imagenSubir: File;

  constructor(private modalService: BsModalService,
              public login: LoginService,
              public userService: UsuarioService) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>, type: string, img: string) {
    this.type = type;
    this.img = img;
    this.modalRef = this.modalService.show(template);
  }

  openModal2(template: TemplateRef<any>, type: string) {
    this.type = type;
    this.modalRef2 = this.modalService.show(template);
  }

  verImagen(archivo: File) {

    if (!archivo) {
      this.imgTemporal = null;
      return;
    }

    if (!archivo.type.includes('image')) {
      this.imgTemporal = null;
      return;
    }

    this.imagenSubir = archivo;
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => (this.imgTemporal = reader.result);
  }

  subirArchivo() {
    this.userService.subirArchivo(this.imagenSubir, this.login.usuario._id, this.login.token, this.type)
      .then((resp: any) => {
        this.login.guardarStorage(resp.usuario._id, this.login.token, resp.usuario);
        this.imagenSubir = null;
        this.imgTemporal = null;
        this.type = null;
        this.modalRef2.hide();
      })
      .catch(err => console.log('Error en la carga'));
  }

}
