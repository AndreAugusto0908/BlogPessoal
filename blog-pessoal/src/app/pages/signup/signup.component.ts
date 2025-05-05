import { Component } from '@angular/core';
import { DefaultLoginComponent } from '../../components/default-login/default-login.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/Auth/login.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../../services/Auth/register.service';

/**
 * Interface representando os controles do formulário de cadastro.
 */
interface SignupForm{
  nome: FormControl,
  usuario: FormControl,
  senha: FormControl
}

/**
 * Componente responsável pela tela de cadastro da aplicação.
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
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
    /**
   * Formulário reativo contendo os campos de cadastro: nome, usuário e senha.
   */
    signupForm!: FormGroup<SignupForm>

    constructor(
      private router: Router,
      private registerService: RegisterService,
      private toastService : ToastrService
    ){
      this.signupForm = new FormGroup({
        nome: new FormControl("", [Validators.required, Validators.min(3)]),
        usuario: new FormControl("", [Validators.required ,  Validators.min(3)]),
        senha: new FormControl("", [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
        ])
      })
    }

      /**
   * Envia os dados do formulário para o serviço de cadastro.
   * Exibe mensagem de sucesso ou erro de acordo com a resposta da API.
   */
    submit(){
      this.registerService.register(this.signupForm.value.nome ,this.signupForm.value.usuario, this.signupForm.value.senha).subscribe({
        next: () => {this.toastService.success("Registro Feito com Sucessor")
        this.router.navigate(["/login"])},
        error: () => this.toastService.error("Erro inesperado tente novamente mais tarde")
      })
    }

    
  /**
   * Redireciona o usuário para a tela de login.
   */
    navigate(){
      this.router.navigate(["login"])
    }
}
