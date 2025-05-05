import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-sidebar',
  imports: [],
  templateUrl: './button-sidebar.component.html',
  styleUrl: './button-sidebar.component.css'
})
export class ButtonSidebarComponent {

  @Input() nameButton: String = "" 
  @Input() route: string = "";
  @Output("submit") onSubmit = new EventEmitter();

  constructor(private router: Router) {}

  isActiveRoute(): boolean {
    return this.router.url === `/auth/dashboard${this.route}`;
  }

  sumbit(){
    this.onSubmit.emit();
  }

}
