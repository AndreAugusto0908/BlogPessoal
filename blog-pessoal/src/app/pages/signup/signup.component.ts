import { Component } from '@angular/core';
import { DefaultLoginComponent } from '../../components/default-login/default-login.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/Auth/login.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../../services/Auth/register.service';

interface SignupForm{
  nome: FormControl,
  usuario: FormControl,
  senha: FormControl
}

@Component({
  selector: 'app-signup',
  imports: [
    DefaultLoginComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers:[
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

    signupForm!: FormGroup<SignupForm>

    constructor(
      private router: Router,
      private registerService: RegisterService,
      private toastService : ToastrService
    ){
      this.signupForm = new FormGroup({
        nome: new FormControl("", [Validators.required, Validators.min(3)]),
        usuario: new FormControl("", [Validators.required ,  Validators.min(3)]),
        senha: new FormControl("", [Validators.required, Validators.min(5)])
      })
    }

    submit(){
      this.registerService.register(this.signupForm.value.nome ,this.signupForm.value.usuario, this.signupForm.value.senha).subscribe({
        next: () => this.toastService.success("Registro Feito com Sucessor"),
        error: () => this.toastService.error("Erro inesperado tente novamente mais tarde")
      })
    }

    navigate(){
      this.router.navigate(["login"])
    }
}
