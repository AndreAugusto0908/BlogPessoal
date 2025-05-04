import { Component } from '@angular/core';
import { NavbarComponent } from "../../../components/dashboard/navbar/navbar.component";
import { SidebarComponent } from "../../../components/dashboard/sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
