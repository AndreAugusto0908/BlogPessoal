import { Component } from '@angular/core';
import { DefaultLoginComponent } from '../../components/default-login/default-login.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/Auth/login.service';
import { ToastrService } from 'ngx-toastr';


/**
 * Interface representando os controles do formulário de login.
 */
interface LoginForm{
  usuario : FormControl,
  senha : FormControl
}

/**
 * Componente responsável pela tela de login da aplicação.
 * Utiliza componentes reutilizáveis e formulário reativo para validação e envio.
 */
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    /**
   * Formulário reativo contendo os campos de login: usuário e senha.
   */
    loginform!: FormGroup<LoginForm>

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

      /**
   * Envia os dados do formulário para o serviço de login.
   * Redireciona para o dashboard em caso de sucesso, exibe erro caso falhe.
   */
    submit(){
      this.loginService.login(this.loginform.value.usuario, this.loginform.value.senha).subscribe({
        next: () => {this.toastService.success("Login Feito com Sucessor")
          this.router.navigate(['auth/dashboard'])
        },
        error: () => this.toastService.error("Erro inesperado tente novamente mais tarde")
      })
    }

      /**
   * Redireciona o usuário para a tela de cadastro.
   */
    navigate(){
      this.router.navigate(["signup"])
    }
}
