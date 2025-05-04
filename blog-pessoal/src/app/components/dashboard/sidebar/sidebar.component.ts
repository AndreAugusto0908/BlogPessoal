import { Component, Input } from '@angular/core';
import { ButtonSidebarComponent } from '../components/button-sidebar/button-sidebar.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    ButtonSidebarComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

    @Input() smallName : string = "LG"
    @Input() name : string = "André Carvalho"
    @Input() username : string = "@"   + "dedezinTomas"

}
