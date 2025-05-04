import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewPostComponent } from '../../forms/new-post/new-post.component';

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

    @Input() smallName : string = "LG"

    onFormularioClick(){
      this.mostrarFormulario = !this.mostrarFormulario
    }
}
