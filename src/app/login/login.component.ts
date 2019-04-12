import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { Usuario } from '../models/user.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  forma: FormGroup;

  constructor(public _loginService: LoginService,
              public router: Router) {
               }

  ngOnInit() {
    this.forma = new FormGroup({
      name: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      sex: new FormControl(null, Validators.required),
    });

    this.forma.setValue({
      name: '',
      lastname: '',
      email: '',
      password: '',
      date: null,
      sex: ''
    });
  }


  login(forma: NgForm) {

    if (forma.invalid) {
      Swal('Ooops', 'Necesita completar el formulario de inicio de sesión', 'error');
      return;
    }

    const user = new Usuario(
      null,
      null,
      forma.value.email,
      forma.value.password,
      null,
      null
    );

    this._loginService.login(user)
      .subscribe((hecho) => {
        this.router.navigate(['/home']);
      });
  }

  registrar() {
    if (this.forma.invalid) {
      return;
    }

    const user = new Usuario(
      this.forma.value.name,
      this.forma.value.lastname,
      this.forma.value.email,
      this.forma.value.password,
      this.forma.value.date,
      this.forma.value.sex,
    );

    this._loginService.newUser(user)
      .subscribe( data => {
        console.log(data);
        Swal('Bienvenido', `${data.name} ${data.lastname} ahora puede ingresar a RedSocial`, 'success');
        this.forma.setValue({
          name: '',
          lastname: '',
          email: '',
          password: '',
          date: null,
          sex: ''
        });
      });
  }

}
