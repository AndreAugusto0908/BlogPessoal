import { Component } from '@angular/core';
import { NewPostComponent } from '../../../components/forms/new-post/new-post.component';
import { NavbarComponent } from '../../../components/dashboard/navbar/navbar.component';
import { SidebarComponent } from '../../../components/dashboard/sidebar/sidebar.component';
import { StatsComponentComponent } from '../../../components/dashboard/stats-component/stats-component.component';

@Component({
  selector: 'app-stats',
  imports: [
    NavbarComponent,
    SidebarComponent,
    NewPostComponent,
    StatsComponentComponent
  ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {

}
