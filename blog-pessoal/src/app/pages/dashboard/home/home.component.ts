import { Component } from '@angular/core';
import { NavbarComponent } from "../../../components/dashboard/navbar/navbar.component";
import { SidebarComponent } from "../../../components/dashboard/sidebar/sidebar.component";
import { FeedComponent } from '../../../components/dashboard/feed/feed.component';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent, 
    SidebarComponent,
    FeedComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
