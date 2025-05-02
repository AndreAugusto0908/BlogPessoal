import { Component } from '@angular/core';
import { DefaultLoginComponent } from '../../components/default-login/default-login.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    DefaultLoginComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers:[
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    loginform!: FormGroup

    constructor(
      private router: Router,
      private loginService: LoginService,
      private toastService : ToastrService
    ){
      this.loginform = new FormGroup({
        usuario: new FormControl("", [Validators.required]),
        senha: new FormControl("", [Validators.required, Validators.min(5)])
      })
    }

    submit(){
      this.loginService.login(this.loginform.value.usuario, this.loginform.value.senha).subscribe({
        next: () => this.toastService.success("Login Feito com Sucessor"),
        error: () => this.toastService.error("Erro inesperado tente novamente mais tarde")
      })
    }

    navigate(){
      this.router.navigate(["signup"])
    }
}
