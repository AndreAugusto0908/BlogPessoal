import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/dashboard/navbar/navbar.component';
import { SidebarComponent } from '../../../components/dashboard/sidebar/sidebar.component';
import { NewPostComponent } from '../../../components/forms/new-post/new-post.component';
import { MeuPerfilCompComponent } from '../../../components/dashboard/meu-perfil-comp/meu-perfil-comp.component';

/**
 * Componente principal da página "Meu Perfil" no dashboard.
 * 
 * Estrutura padrão de layout com:
 * - Navbar superior
 * - Sidebar lateral
 * - Formulário de nova postagem
 * - Componente específico com os dados e postagens do usuário logado
 */
@Component({
  selector: 'app-meu-perfil',
  imports: [
    NavbarComponent,
    SidebarComponent,
    NewPostComponent,
    MeuPerfilCompComponent
  ],
  templateUrl: './meu-perfil.component.html',
  styleUrl: './meu-perfil.component.css'
})
export class MeuPerfilComponent {

}
