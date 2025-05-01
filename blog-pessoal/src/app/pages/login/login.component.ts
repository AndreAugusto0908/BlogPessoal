import { Component } from '@angular/core';
import { DefaultLoginComponent } from '../../components/default-login/default-login.component';

@Component({
  selector: 'app-login',
  imports: [
    DefaultLoginComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
