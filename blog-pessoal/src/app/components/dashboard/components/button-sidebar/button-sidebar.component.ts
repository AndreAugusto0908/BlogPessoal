import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-sidebar',
  imports: [],
  templateUrl: './button-sidebar.component.html',
  styleUrl: './button-sidebar.component.css'
})
export class ButtonSidebarComponent {

  @Input() nameButton: String = "" 

}
