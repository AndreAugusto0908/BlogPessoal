import { Component, Input } from '@angular/core';

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
}
