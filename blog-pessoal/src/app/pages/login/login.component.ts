import { Component } from '@angular/core';
import { DefaultLoginComponent } from '../../components/default-login/default-login.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';

@Component({
  selector: 'app-login',
  imports: [
    DefaultLoginComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    loginform!: FormGroup

    constructor(){
      this.loginform = new FormGroup({
        usuario: new FormControl("", [Validators.required]),
        senha: new FormControl("", [Validators.required, Validators.min(5)])
      })
    }

    submit(){
      console.log(this.loginform.value)
    }
}
