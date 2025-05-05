import { Component } from '@angular/core';
import { NavbarComponent } from "../../../components/dashboard/navbar/navbar.component";
import { SidebarComponent } from "../../../components/dashboard/sidebar/sidebar.component";
import { FeedComponent } from '../../../components/dashboard/feed/feed.component';
import { NewPostComponent } from '../../../components/forms/new-post/new-post.component';

/**
 * Componente principal da página "Home" do dashboard do usuário autenticado.
 * 
 * Este componente agrupa e exibe a estrutura de navegação principal:
 * - Navbar (topo)
 * - Sidebar (lateral esquerda)
 * - Feed (conteúdo principal com postagens)
 * - NewPost (formulário de criação de nova postagem, visível em resoluções específicas)
 */
@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent, 
    SidebarComponent,
    FeedComponent,
    NewPostComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
