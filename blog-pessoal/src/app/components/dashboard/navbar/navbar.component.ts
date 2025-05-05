import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewPostComponent } from '../../forms/new-post/new-post.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    NewPostComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    mostrarFormulario = false

    @Input() name : string = sessionStorage.getItem("nome") ?? ""

    
  constructor(private router: Router) {}

    onFormularioClick(){
      this.mostrarFormulario = !this.mostrarFormulario
    }


    irParaHome() {
      this.router.navigate(['/auth/dashboard']);
    }
    
    irParaPerfil() {
      this.router.navigate(['/auth/dashboard/meuPerfil']);
    }
    
    irParaEstatisticas() {
      this.router.navigate(['/auth/dashboard/stats']);
    }
}
