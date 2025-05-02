import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-login',
  imports: [],
  templateUrl: './default-login.component.html',
  styleUrl: './default-login.component.css'
})
export class DefaultLoginComponent {
    @Input() subText : string = ""
    @Input() yellowSubText : string = ""
    @Input() bttnText : string = ""
    @Input() disableButton : boolean = true;
    @Output("submit") onSubmit = new EventEmitter();
    @Output("navigate") onNavigate = new EventEmitter();

    sumbit(){
      this.onSubmit.emit();
    }

    navigate(){
      this.onNavigate.emit();
    }
}
